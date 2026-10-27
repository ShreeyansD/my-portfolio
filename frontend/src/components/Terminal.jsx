import { useEffect, useRef, useState } from "react";
import { complete } from "../lib/commands";
import { owner } from "../data/portfolio";
import { Output } from "./outputs/Output";

export const Prompt = () => (
  <span className="shrink-0 select-none">
    <span className="text-[#10B981]">{owner.handle}@{owner.host}</span>
    <span className="text-[#8B949E]">:</span>
    <span className="text-[#38BDF8]">~</span>
    <span className="mr-2 text-[#8B949E]">$</span>
  </span>
);

const InputLine = ({ run, history, inputRef }) => {
  const [value, setValue] = useState("");
  const [idx, setIdx] = useState(-1);

  const onKey = (e) => {
    if (e.key === "Enter") { run(value); setValue(""); setIdx(-1); }
    else if (e.key === "Tab") { e.preventDefault(); const c = complete(value); if (c) setValue(c); }
    else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const n = idx === -1 ? history.length - 1 : Math.max(0, idx - 1);
      setIdx(n); setValue(history[n]);
    } else if (e.key === "ArrowDown" && idx !== -1) {
      e.preventDefault();
      const n = idx + 1;
      if (n >= history.length) { setIdx(-1); setValue(""); } else { setIdx(n); setValue(history[n]); }
    } else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); run("clear"); }
  };

  return (
    <div className="flex items-center gap-0 text-sm">
      <Prompt />
      <input
        ref={inputRef}
        data-testid="terminal-command-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKey}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        aria-label="terminal command input"
        placeholder="type 'help' or tap a chip…"
        className="min-w-0 flex-1 bg-transparent text-[#F0F6FC] caret-[#10B981] outline-none placeholder:text-[#6E7681]"
      />
    </div>
  );
};

export const Terminal = ({ entries, history, run }) => {
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [entries.length]);

  return (
    <div
      ref={scrollRef}
      data-lenis-prevent
      data-testid="terminal-body"
      onClick={(e) => { if (!window.getSelection()?.toString() && e.target === e.currentTarget) inputRef.current?.focus(); }}
      className="terminal-scroll h-[68vh] min-h-[420px] space-y-5 overflow-y-auto px-4 py-5 text-sm sm:px-6"
    >
      {entries.map((e) => (
        <div key={e.id} data-testid={`terminal-entry-${e.type}`}>
          {e.cmd !== null && (
            <div className="mb-2 flex flex-wrap"><Prompt /><span className="text-[#F0F6FC]">{e.cmd}</span></div>
          )}
          <Output entry={e} run={run} />
        </div>
      ))}
      <InputLine run={run} history={history} inputRef={inputRef} />
    </div>
  );
};
