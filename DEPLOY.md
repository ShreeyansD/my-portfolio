# Deploy guide  (Vercel + Render + MongoDB Atlas, all free tiers)

Order matters: database -> backend -> frontend -> one CORS update.

## 0. Put the code on GitHub
    cd my-portfolio && git init && git add . && git commit -m "portfolio"
    # create an empty repo on github.com, then:
    git remote add origin https://github.com/<you>/my-portfolio.git && git push -u origin main
(.gitignore already keeps .env, venv and node_modules out. Never commit real keys.)

## 1. Database: MongoDB Atlas
1. https://www.mongodb.com/cloud/atlas -> sign up -> create a FREE cluster (M0).
2. Security -> Database Access -> Add user (username + password; save them).
3. Security -> Network Access -> Add IP -> "Allow access from anywhere" (0.0.0.0/0).
   (Render's free tier has no fixed IP, so this is required. The DB password protects it.)
4. Connect -> Drivers -> copy the `mongodb+srv://...` string, replace <password>.
   If the password has special characters (@ : / ?), URL-encode them.
Collections (`contact_messages`, `chat_turns`) are created automatically on first write.

## 2. Backend: Render
1. https://render.com -> New -> Blueprint -> pick your GitHub repo (it reads render.yaml).
2. When asked, fill in:
   MONGO_URL          = the Atlas string from step 1
   ANTHROPIC_API_KEY  = from https://console.anthropic.com (set a monthly spend limit there!)
   CORS_ORIGINS       = * for now (tightened in step 4)
3. Deploy. Open https://<your-service>.onrender.com/api/  -> should show {"message":"shrsh online"}

## 3. Frontend: Vercel
1. https://vercel.com -> Add New Project -> import the repo.
2. Root Directory: `frontend`.  Framework preset: Create React App (auto-detected).
3. Environment variable: REACT_APP_BACKEND_URL = https://<your-service>.onrender.com  (no trailing slash)
4. Deploy.

## 4. Lock down CORS
In Render -> Environment -> CORS_ORIGINS = https://<your-site>.vercel.app  (add a custom domain too,
comma-separated, if you get one). Save -> auto-redeploys.

## Test checklist
- Site loads, matrix rain, marquee, CRT flicker, typewriter all animate.
- Terminal: `ask what projects has he built` -> streams an answer (first call may take ~1 min if Render was asleep).
- Terminal: `contact` -> send a message -> it appears in Atlas (Browse Collections -> portfolio.contact_messages).

## Costs / limits to know
- Render free service sleeps after 15 min idle; the site pings it on load to wake it early.
- Abuse limits are built in (15 ask/hour per IP, 300 ask/day total, 5 contact/hour per IP).
  Tune with ASK_PER_IP_PER_HOUR, ASK_GLOBAL_PER_DAY, CONTACT_PER_IP_PER_HOUR env vars.
- Each `ask` is a small Sonnet call; the 300/day cap bounds your worst-case spend.

## Local development
    cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt
    cp .env.example .env   # fill in MONGO_URL etc.
    uvicorn server:app --reload --port 8000
    # new terminal
    cd frontend && npm install && REACT_APP_BACKEND_URL=http://localhost:8000 npm start
