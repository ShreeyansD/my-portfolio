import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { profileForAI } from "../../data/portfolio";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const sessionId = () => {
  let s = localStorage.getItem("shrsh_sid");
  if (!s) { s = crypto.randomUUID?.() || String(Date.now()) + Math.random().toString(16).slice(2); localStorage.setItem("shrsh_sid", s); }
  return s;
};

async function streamAsk(question, onText) {
  const res = await fetch(`${API}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId(), question, profile: profileForAI }),
  });
  if (!res.ok || !res.body) throw new Error(`http ${res.status}`);
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const parts = buf.split("\n\n");
    buf = parts.pop();
    for (const p of parts) {
      const data = p.replace(/^data: /, "");
      if (data === "[DONE]") return true;
      const j = JSON.parse(data);
      if (j.error) throw new Error(j.error);
      if (j.t) onText(j.t);
    }
  }
  return false; // stream closed without [DONE]: connection dropped mid-answer
}

export const Ask = ({ entry }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("thinking");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    streamAsk(entry.arg, (t) => { setStatus("streaming"); setText((x) => x + t); })
      .then((ok) => setStatus(ok ? "done" : "cut"))
      .catch(() => setStatus("error"));
  }, [entry.arg]);

  return (
    <div data-testid="ask-output" className="max-w-3xl rounded-lg border border-[#C084FC]/30 bg-[#C084FC]/[0.04] p-4">
      <p className="mb-2 flex items-center gap-2 text-xs text-[#C084FC]"><Sparkles className="h-3.5 w-3.5" /> shrsh-ai {status === "thinking" && <span className="text-[#8B949E]">thinking<span className="dots" /></span>}</p>
      {status === "error"
        ? <p data-testid="ask-error" className="text-[#F87171]">ai offline right now — try 'contact' instead.</p>
        : <p data-testid="ask-response" className="whitespace-pre-wrap leading-relaxed text-[#C9D1D9]">{text}{status !== "done" && status !== "cut" && <span className="tw-caret">▋</span>}{status === "cut" && <span className="block pt-2 text-xs text-[#FBBF24]">⚠ connection dropped mid-answer — ask again.</span>}</p>}
    </div>
  );
};