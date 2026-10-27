import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Copy, Check, Send, Loader2 } from "lucide-react";
import { contacts } from "../../data/portfolio";
import { Stagger, Item } from "./Typewriter";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const CopyBtn = ({ id, value }) => {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setDone(true); toast.success(`copied ${value}`); setTimeout(() => setDone(false), 1400); }
    catch { toast.error("clipboard unavailable"); }
  };
  return (
    <button data-testid={`copy-${id}-btn`} onClick={copy} aria-label={`copy ${id}`} className="rounded p-1.5 text-[#8B949E] transition-colors hover:bg-[#38BDF8]/10 hover:text-[#38BDF8]">
      {done ? <Check className="h-3.5 w-3.5 text-[#10B981]" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
};

export const Contact = ({ run }) => (
  <Stagger className="max-w-xl space-y-1" >
    {contacts.map((c) => (
      <Item key={c.id} className="flex items-center gap-3 rounded px-1 hover:bg-[#161B22]">
        <span className="w-20 shrink-0 text-[#FBBF24]">{c.label}</span>
        <a data-testid={`contact-link-${c.id}`} href={c.href} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-[#C9D1D9] hover:text-[#38BDF8]">{c.value}</a>
        <CopyBtn id={c.id} value={c.value} />
      </Item>
    ))}
    <Item className="pt-2 text-[#8B949E]">
      prefer writing here? run <button data-testid="contact-sendmsg-link" onClick={() => run("sendmsg")} className="text-[#C084FC] underline decoration-dotted underline-offset-4">sendmsg</button>
    </Item>
  </Stagger>
);

const Field = ({ label, children }) => (
  <label className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
    <span className="w-20 shrink-0 pt-2 text-[#FBBF24]">{label}&gt;</span>
    {children}
  </label>
);

const inputCls = "w-full rounded border border-[#30363D] bg-[#0D1117] px-3 py-2 text-[#F0F6FC] outline-none transition-colors placeholder:text-[#6E7681] focus:border-[#10B981]";

export const ContactForm = () => {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState("idle");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState("sending");
    try {
      await axios.post(`${API}/contact`, f);
      setState("sent");
      toast.success("message delivered to inbox");
    } catch (err) {
      setState("idle");
      toast.error(err?.response?.status === 422 ? "check your email / fields" : "send failed — try again");
    }
  };

  if (state === "sent") return <p data-testid="contact-form-success" className="text-[#10B981]">✔ 200 OK — thanks {f.name}, I'll reply to {f.email} soon.</p>;

  return (
    <form data-testid="contact-form" onSubmit={submit} className="max-w-xl space-y-3 rounded-lg border border-dashed border-[#30363D] p-4">
      <p className="text-xs text-[#6E7681]"># sendmsg — fields are required</p>
      <Field label="name"><input data-testid="contact-form-name" required value={f.name} onChange={set("name")} className={inputCls} placeholder="Ada Lovelace" /></Field>
      <Field label="email"><input data-testid="contact-form-email" type="email" required value={f.email} onChange={set("email")} className={inputCls} placeholder="ada@example.com" /></Field>
      <Field label="msg"><textarea data-testid="contact-form-message" required rows={3} value={f.message} onChange={set("message")} className={inputCls} placeholder="Hey, loved your project…" /></Field>
      <button data-testid="contact-form-submit" disabled={state === "sending"} className="ml-auto flex items-center gap-2 rounded-md bg-[#C084FC] px-4 py-2 text-xs font-semibold text-[#0A0B10] transition-shadow hover:shadow-[0_0_24px_-4px_#C084FC] disabled:opacity-60">
        {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} ./send
      </button>
    </form>
  );
};
