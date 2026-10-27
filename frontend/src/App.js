import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { CloudRain } from "lucide-react";
import "./App.css";
import { Toaster } from "sonner";
import { Logo } from "./components/Logo";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { IdeHeader } from "./components/IdeHeader";
import { Terminal } from "./components/Terminal";
import { Sidebar } from "./components/Sidebar";
import { StatusDot } from "./components/StatusDot";
import { MatrixRain } from "./components/MatrixRain";
import { useTerminal } from "./hooks/useTerminal";
import { owner } from "./data/portfolio";

const useLenis = () => {
  const ref = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    ref.current = lenis;
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return ref;
};

const RainToggle = ({ on, toggle }) => (
  <button
    data-testid="rain-toggle-btn"
    onClick={toggle}
    aria-pressed={on}
    className={`ml-auto flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${on ? "border-[#10B981]/60 text-[#10B981]" : "border-[#30363D] text-[#8B949E] hover:text-[#F0F6FC]"}`}
  >
    <CloudRain className="h-3.5 w-3.5" /> rain {on ? "on" : "off"}
  </button>
);

const Nav = ({ onEnter, rain, toggleRain }) => (
  <header className="fixed inset-x-0 top-0 z-40 border-b border-[#30363D]/60 bg-[#0A0B10]/70 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 sm:px-8">
      <Logo />
      <span data-testid="brand-name" className="text-sm font-bold text-[#F0F6FC]">shrsh<span className="text-[#10B981]">_</span></span>
      <span className="hidden text-xs text-[#6E7681] sm:inline">/ {owner.handle}'s shell</span>
      <RainToggle on={rain} toggle={toggleRain} />
      <button data-testid="nav-open-terminal-btn" onClick={onEnter} className="rounded-full border border-[#30363D] px-4 py-1.5 text-xs text-[#F0F6FC] transition-colors hover:border-[#10B981] hover:text-[#10B981]">
        <span className="hidden sm:inline">open terminal </span>↓
      </button>
    </div>
  </header>
);

function App() {
  // Free backends sleep when idle; ping it on page load so it's awake by the time someone types `ask`.
  useEffect(() => {
    const base = process.env.REACT_APP_BACKEND_URL;
    if (base) fetch(`${base}/api/`).catch(() => {});
  }, []);
  const [crt, setCrt] = useState(true);
  const [rain, setRain] = useState(() => localStorage.getItem("shrsh_rain") !== "off");
  const toggleRain = () => setRain((r) => { localStorage.setItem("shrsh_rain", r ? "off" : "on"); return !r; });
  const toggleCrt = useCallback(() => setCrt((c) => !c), []);
  const { entries, history, run } = useTerminal({ onCrt: toggleCrt });
  const lenis = useLenis();
  const termRef = useRef(null);
  const enter = () => {
    if (termRef.current) lenis.current?.scrollTo(termRef.current, { offset: -80 });
    setTimeout(() => document.querySelector('[data-testid="terminal-command-input"]')?.focus({ preventScroll: true }), 900);
  };

  return (
    <div className="App relative min-h-screen overflow-x-hidden bg-[#0A0B10] font-mono text-[#C9D1D9]">
      {rain && <MatrixRain />}
      <div className="grain pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
      <Nav onEnter={enter} rain={rain} toggleRain={toggleRain} />
      <Hero onEnter={enter} />
      <Marquee />
      <section ref={termRef} data-testid="ide-section" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#FBBF24]">01 — interactive shell</p>
            <h2 className="mt-2 text-base text-[#F0F6FC] md:text-lg">Everything about me, one command away.</h2>
          </div>
          <StatusDot color="#38BDF8" label="tty1 · connected" />
        </motion.div>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            data-testid="terminal-window"
            className={`relative overflow-hidden rounded-xl border border-[#30363D] bg-[#161B22] shadow-[0_40px_120px_-40px_rgba(16,185,129,0.35)] lg:col-span-8 xl:col-span-9 ${crt ? "crt-on" : ""}`}
          >
            <IdeHeader run={run} crt={crt} toggleCrt={toggleCrt} />
            <Terminal entries={entries} history={history} run={run} />
            <div className="flex items-center gap-4 border-t border-[#30363D] bg-[#0D1117] px-4 py-1.5 text-[11px] text-[#8B949E]">
              <span className="text-[#10B981]">● main</span><span>utf-8</span><span className="hidden sm:inline">shrsh 1.0</span>
              <span className="ml-auto">{entries.length} blocks</span>
            </div>
          </motion.div>
          <div className="lg:sticky lg:top-24 lg:col-span-4 xl:col-span-3">
            <Sidebar run={run} />
          </div>
        </div>
      </section>
      <footer className="relative z-10 border-t bg-[#0A0B10]/80 border-[#30363D] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs text-[#8B949E]">
          <span className="flex items-center gap-2"><Logo size={20} /> © 2026 {owner.name} — built in a terminal.</span>
          <span>process exited with code <span className="text-[#10B981]">0</span></span>
        </div>
      </footer>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;