import { motion } from "framer-motion";
import { Tv } from "lucide-react";
import { owner } from "../data/portfolio";

const CHIPS = [
  { label: "help", cmd: "help" },
  { label: "projects", cmd: "ls projects/" },
  { label: "skills", cmd: "cat skills.json" },
  { label: "contact", cmd: "contact" },
  { label: "clear", cmd: "clear" },
];

export const IdeHeader = ({ run, crt, toggleCrt }) => (
  <div className="border-b border-[#30363D] bg-[#0D1117]">
    <div className="flex items-center gap-4 px-4 py-3">
      <div className="flex gap-2" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
      </div>
      <p data-testid="ide-breadcrumb" className="min-w-0 flex-1 truncate text-xs text-[#8B949E]">
        ~/portfolio/<span className="text-[#C084FC]">{owner.handle}</span>/<span className="text-[#F0F6FC]">main.sh</span>
      </p>
      <button
        data-testid="crt-toggle-btn"
        onClick={toggleCrt}
        className={`flex items-center gap-1.5 rounded border px-2 py-1 text-[11px] transition-colors ${crt ? "border-[#FBBF24]/60 text-[#FBBF24]" : "border-[#30363D] text-[#8B949E] hover:text-[#F0F6FC]"}`}
      >
        <Tv className="h-3.5 w-3.5" /> crt {crt ? "on" : "off"}
      </button>
    </div>
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
      {CHIPS.map((c) => (
        <motion.button
          key={c.label}
          data-testid={`chip-${c.label}`}
          onClick={() => run(c.cmd)}
          whileTap={{ scale: 0.94 }}
          className="shrink-0 rounded-md border border-[#30363D] bg-[#161B22] px-3 py-2 text-xs text-[#38BDF8] transition-colors hover:border-[#38BDF8]/70 hover:bg-[#38BDF8]/10 hover:shadow-[0_0_18px_-6px_#38BDF8]"
        >
          [{c.label}]
        </motion.button>
      ))}
    </div>
  </div>
);
