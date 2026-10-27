import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin, Mail, Cpu } from "lucide-react";
import { owner, contacts } from "../data/portfolio";
import { StatusDot } from "./StatusDot";
import { CopyBtn } from "./outputs/Contact";

const ICONS = { github: Github, linkedin: Linkedin, email: Mail };

const Uptime = () => {
  const [s, setS] = useState(0);
  useEffect(() => { const t = setInterval(() => setS((v) => v + 1), 1000); return () => clearInterval(t); }, []);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return <span data-testid="sidebar-uptime" className="text-[#F0F6FC]">00:{mm}:{ss}</span>;
};

const Row = ({ k, children }) => (
  <div className="flex justify-between gap-3 border-b border-dashed border-[#30363D] py-2 text-xs last:border-0">
    <span className="text-[#8B949E]">{k}</span><span className="text-right">{children}</span>
  </div>
);

export const Sidebar = ({ run }) => {
  const [open, setOpen] = useState(true);
  return (
    <aside data-testid="sidebar-panel" className="overflow-hidden rounded-xl border border-[#30363D] bg-[#161B22]/90 backdrop-blur-md">
      <button data-testid="sidebar-toggle-btn" onClick={() => setOpen(!open)} className="flex w-full items-center gap-2 border-b border-[#30363D] bg-[#0D1117] px-4 py-3 text-xs text-[#F0F6FC]">
        <Cpu className="h-4 w-4 text-[#10B981]" /> system.status
        <ChevronDown className={`ml-auto h-4 w-4 text-[#8B949E] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3 }}>
            <div className="space-y-5 p-4">
              <div>
                <Row k="status"><StatusDot color="#10B981" label="online" /></Row>
                <Row k="focus"><span data-testid="sidebar-focus" className="text-[#FBBF24]">{owner.focus}</span></Row>
                <Row k="session"><Uptime /></Row>
                <Row k="open to"><span className="text-[#38BDF8]">{owner.availability}</span></Row>
              </div>
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-widest text-[#8B949E]">quick links</p>
                <div className="space-y-1">
                  {contacts.map((c) => {
                    const I = ICONS[c.id];
                    return (
                      <div key={c.id} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-[#0D1117]">
                        <I className="h-4 w-4 text-[#C084FC]" />
                        <a data-testid={`sidebar-link-${c.id}`} href={c.href} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-[#C9D1D9] hover:text-[#F0F6FC]">{c.label}</a>
                        <CopyBtn id={`sidebar-${c.id}`} value={c.value} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <a data-testid="sidebar-resume-download" href={owner.resumeUrl} download className="flex items-center justify-center gap-2 rounded-md bg-[#10B981] py-2.5 text-xs font-semibold text-[#0A0B10] transition-shadow hover:shadow-[0_0_24px_-4px_#10B981]">
                <Download className="h-4 w-4" /> resume.pdf
              </a>
              <button data-testid="sidebar-ask-btn" onClick={() => run("ask what are you building right now?")} className="w-full rounded-md border border-[#C084FC]/40 py-2.5 text-xs text-[#C084FC] transition-colors hover:bg-[#C084FC]/10">
                $ ask "what are you building?"
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
