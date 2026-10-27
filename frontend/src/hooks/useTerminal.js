import { useCallback, useRef, useState } from "react";
import { parse } from "../lib/commands";

let uid = 0;
const boot = [{ id: uid++, cmd: null, type: "banner" }];

export function useTerminal({ onCrt }) {
  const [entries, setEntries] = useState(boot);
  const [history, setHistory] = useState([]);
  const pending = useRef(0);

  const run = useCallback((raw) => {
    const res = parse(raw);
    if (raw.trim()) setHistory((h) => [...h.filter((x) => x !== raw.trim()), raw.trim()].slice(-50));
    if (res.type === "clear") { setEntries([]); return; }
    if (res.type === "crt") onCrt?.();
    pending.current += 1;
    setEntries((e) => [...e, { id: uid++, cmd: raw.trim(), ...res }]);
  }, [onCrt]);

  return { entries, history, run };
}
