import { useEffect, useRef } from "react";
import { owner } from "../data/portfolio";

const SNIPPETS = [
  "const app = express();",
  "def solve(n): return dp[n]",
  "git commit -m \"fix\"",
  "for (int i = 0; i < n; ++i)",
  "SELECT * FROM users;",
  "async fn main() -> Result<()>",
  "if (err != nil) { return err }",
  "import React from 'react';",
  "while True: yield next(it)",
  "std::vector<int> v;",
  "$ sudo make install",
  "return a.map(x => x * 2);",
  "0x7f 0x45 0x4c 0x46",
  "{ \"status\": 200 }",
];
const NAME = owner.name.toUpperCase();
const FONT = 16;
const FPS = 24;
const NAME_EVERY = FPS * 3;

const pick = () => SNIPPETS[(Math.random() * SNIPPETS.length) | 0];
const newCol = (y) => ({ y, text: pick(), idx: (Math.random() * 20) | 0, name: false });

export const MatrixRain = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = false; // always animate
    let cols = [];
    let raf;
    let last = 0;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT}px "JetBrains Mono", monospace`;
      cols = Array.from({ length: Math.ceil(window.innerWidth / FONT) }, () => newCol(Math.random() * -60));
    };

    const spawnName = () => {
      const c = cols[(Math.random() * cols.length) | 0];
      if (c) Object.assign(c, { text: NAME, idx: 0, name: true, y: Math.max(0, c.y) });
    };

    const drawChar = (c, x) => {
      const ch = c.text[c.idx];
      if (c.name) {
        ctx.shadowColor = "#10B981";
        ctx.shadowBlur = 14;
        ctx.fillStyle = "rgba(240, 253, 244, 0.95)";
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(167, 243, 208, 0.24)";
      }
      ctx.fillText(ch, x, c.y * FONT);
      c.idx += 1;
      if (c.idx >= c.text.length) Object.assign(c, { text: pick(), idx: 0, name: false });
    };

    const draw = () => {
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(10, 11, 16, 0.12)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      cols.forEach((c, i) => {
        drawChar(c, i * FONT);
        if (c.y * FONT > window.innerHeight && !c.name && Math.random() > 0.975) Object.assign(c, newCol(0));
        else c.y += 1;
      });
      frame += 1;
      if (frame % NAME_EVERY === 0) spawnName();
    };

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || t - last < 1000 / FPS) return;
      last = t;
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduce) { for (let i = 0; i < 80; i += 1) draw(); }
    else raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={ref} data-testid="matrix-rain-canvas" className="h-full w-full opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,11,16,0.55)_0%,rgba(10,11,16,0.15)_70%,transparent_100%)]" />
    </div>
  );
};
