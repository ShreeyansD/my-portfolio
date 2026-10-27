from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from anthropic import AsyncAnthropic
import os
import json
import logging
import time
from collections import defaultdict, deque
from pathlib import Path
from typing import Annotated, Optional
from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]
anthropic_client = AsyncAnthropic(api_key=os.environ['ANTHROPIC_API_KEY'])
MODEL = os.environ.get('ANTHROPIC_MODEL', 'claude-sonnet-5-5')

app = FastAPI()
api_router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]



# ---- abuse protection (in-memory; resets when the server restarts, fine for a portfolio) ----
ASK_PER_IP_PER_HOUR = int(os.environ.get('ASK_PER_IP_PER_HOUR', '15'))
ASK_GLOBAL_PER_DAY = int(os.environ.get('ASK_GLOBAL_PER_DAY', '300'))
CONTACT_PER_IP_PER_HOUR = int(os.environ.get('CONTACT_PER_IP_PER_HOUR', '5'))
_hits = defaultdict(deque)


def client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def rate_limit(key: str, limit: int, window_s: int) -> bool:
    """Return True if the call is allowed, False if the limit is exceeded."""
    now = time.time()
    q = _hits[key]
    while q and now - q[0] > window_s:
        q.popleft()
    if len(q) >= limit:
        return False
    q.append(now)
    return True


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        return self.model_dump(by_alias=True, exclude={"id"})

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls(**doc)


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)


class ContactMessage(BaseDocument):
    name: str
    email: str
    message: str
    created_at: str


class ChatTurn(BaseDocument):
    session_id: str
    role: str
    text: str
    created_at: str


class AskIn(BaseModel):
    session_id: str = Field(min_length=4, max_length=80)
    question: str = Field(min_length=1, max_length=600)
    profile: str = Field(default="", max_length=8000)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


@api_router.get("/")
async def root():
    return {"message": "shrsh online"}


@api_router.post("/contact")
async def create_contact(payload: ContactIn, request: Request):
    if not rate_limit(f"contact:{client_ip(request)}", CONTACT_PER_IP_PER_HOUR, 3600):
        raise HTTPException(429, "too many messages, try again later")
    msg = ContactMessage(**payload.model_dump(), created_at=now_iso())
    res = await db.contact_messages.insert_one(msg.to_mongo())
    msg.id = str(res.inserted_id)
    return {"ok": True, "id": msg.id, "created_at": msg.created_at}


SYSTEM_TMPL = (
    "You are `shrsh-ai`, a terminal assistant embedded in a CS student's portfolio. "
    "Answer visitor questions about the portfolio owner ONLY using the profile below. "
    "Be concise (max ~120 words), friendly, plain text, no markdown headers. "
    "If something isn't in the profile, say you don't have that info and suggest the `contact` command.\n\n"
    "PROFILE:\n{profile}"
)


@api_router.post("/ask")
async def ask(payload: AskIn, request: Request):
    if not rate_limit(f"ask:{client_ip(request)}", ASK_PER_IP_PER_HOUR, 3600) or not rate_limit("ask:global", ASK_GLOBAL_PER_DAY, 86400):
        raise HTTPException(429, "rate limit reached")
    question = payload.question.strip()
    if not question:
        raise HTTPException(400, "empty question")

    prior = await db.chat_turns.find({"session_id": payload.session_id}).sort("created_at", -1).to_list(8)
    prior = [ChatTurn.from_mongo(d) for d in reversed(prior)]
    history = "\n".join(f"{t.role}: {t.text}" for t in prior)
    text = f"Recent conversation:\n{history}\n\nVisitor: {question}" if history else question

    await db.chat_turns.insert_one(
        ChatTurn(session_id=payload.session_id, role="visitor", text=question, created_at=now_iso()).to_mongo()
    )

    system = SYSTEM_TMPL.format(profile=payload.profile or "(no profile provided)")

    async def gen():
        full = ""
        try:
            async with anthropic_client.messages.stream(
                model=MODEL,
                max_tokens=400,
                system=system,
                messages=[{"role": "user", "content": text}],
            ) as stream:
                async for delta in stream.text_stream:
                    full += delta
                    yield f"data: {json.dumps({'t': delta})}\n\n"
        except Exception as e:
            logger.exception("ask failed")
            yield f"data: {json.dumps({'error': str(e)[:200]})}\n\n"
        if full:
            await db.chat_turns.insert_one(
                ChatTurn(session_id=payload.session_id, role="assistant", text=full, created_at=now_iso()).to_mongo()
            )
        yield "data: [DONE]\n\n"

    return StreamingResponse(gen(), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[o.strip() for o in os.environ.get('CORS_ORIGINS', '*').split(',')],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
