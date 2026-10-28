import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { owner } from "../data/portfolio";
import { StatusDot } from "./StatusDot";

const LINES = [
  { text: owner.handle, cls: "text-[#F0F6FC]" },
  { text: "compiles ideas", cls: "text-[#38BDF8]" },
  { text: "into software_", cls: "text-[#10B981] hero-caret" },
];

const MaskLine = ({ children, i, cls }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <motion.span
      className={`block ${cls}`}
      initial={{ y: "105%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay: 0.25 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = ({ onEnter }) => (
  <section data-testid="hero-section" className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:pb-28 lg:pt-40">
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="mb-8 flex flex-wrap items-center gap-3 text-xs"
      >
        <StatusDot color="#10B981" label="online" />
        <span className="text-[#484F58]">/</span>
        <StatusDot color="#FBBF24" label="building" />
        <span className="text-[#8B949E]">— {owner.role.toLowerCase()}</span>
      </motion.div>
      <h1 data-testid="hero-title" className="font-extrabold leading-[0.95] tracking-[-0.04em] text-[13vw] sm:text-6xl lg:text-8xl xl:text-[6.5rem]">
        {LINES.map((l, i) => <MaskLine key={l.text} i={i} cls={l.cls}>{l.text}</MaskLine>)}
      </h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-8 max-w-xl text-sm leading-relaxed text-[#8B949E] md:text-base"
      >
        <span className="text-[#C084FC]">//</span> {owner.major} @ {owner.university}. Building AI-powered apps, one project at a time.
        Everything below is a real shell — type, tab-complete, or just tap.
      </motion.p>
      <motion.button
        data-testid="hero-enter-terminal-btn"
        onClick={onEnter}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
        whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
        className="group mt-10 inline-flex items-center gap-3 rounded-full border border-[#10B981]/50 bg-[#10B981]/10 px-6 py-3 text-sm text-[#10B981] shadow-[0_0_30px_-8px_#10B981] transition-colors hover:bg-[#10B981] hover:text-[#0A0B10]"
      >
        $ ./main.sh --interactive
        <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
      </motion.button>
      <motion.p
        data-testid="hero-focus"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        className="mt-10 text-xs text-[#8B949E]"
      >
        $ uptime --focus <span className="ml-2 text-[#FBBF24]">{owner.focus}</span>
      </motion.p>
    </div>
  </section>
);