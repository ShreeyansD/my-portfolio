import { COMMANDS } from "../../lib/commands";
import { owner } from "../../data/portfolio";
import { Typewriter, Stagger, Item } from "./Typewriter";

const ASCII = String.raw`
     _                                         
 ___| |__  _ __ ___  ___ _   _  __ _ _ __  ___ 
/ __| '_ \| '__/ _ \/ _ \ | | |/ _' | '_ \/ __|
\__ \ | | | | |  __/  __/ |_| | (_| | | | \__ \
|___/_| |_|_|  \___|\___|\__, |\__,_|_| |_|___/
                         |___/                 `;

export const Banner = ({ run }) => (
  <div data-testid="welcome-banner">
    <pre className="ascii-glow overflow-x-auto text-[9px] leading-[1.15] text-[#10B981] sm:text-xs">{ASCII}</pre>
    <p className="mt-3 text-[#F0F6FC]"><Typewriter text={`shrsh v1.0 — ${owner.role} @ ${owner.university}`} /></p>
    <p className="mt-1 text-[#8B949E]">
      Type <button data-testid="banner-help-link" onClick={() => run("help")} className="text-[#FBBF24] underline decoration-dotted underline-offset-4">help</button> to see commands, or try <span className="text-[#C084FC]">ask what are you working on?</span>
    </p>
  </div>
);

export const Help = ({ run }) => (
  <Stagger className="grid gap-1" >
    {COMMANDS.map((c) => (
      <Item key={c.cmd} className="grid grid-cols-[minmax(0,10.5rem)_1fr] gap-3 sm:grid-cols-[13rem_1fr]">
        <button
          data-testid={`help-cmd-${c.cmd.split(" ")[0]}-${c.cmd.length}`}
          onClick={() => !c.cmd.includes("<") && run(c.cmd)}
          className="truncate text-left text-[#38BDF8] hover:text-[#10B981]"
        >
          {c.cmd}
        </button>
        <span className="text-[#8B949E]">{c.desc}</span>
      </Item>
    ))}
    <Item className="mt-2 text-xs text-[#6E7681]">tip: ↑/↓ history · Tab autocomplete · Ctrl+L clear</Item>
  </Stagger>
);

export const About = () => (
  <Stagger className="max-w-3xl space-y-3 border-l-2 border-[#C084FC]/50 pl-4" >
    <Item className="text-[#6E7681]"># about.txt</Item>
    <Item className="text-lg font-bold text-[#F0F6FC]">{owner.name} <span className="text-sm font-normal text-[#8B949E]">— {owner.role}</span></Item>
    <Item className="leading-relaxed text-[#C9D1D9]"><Typewriter text={owner.bio} speed={8} /></Item>
    <Item className="grid gap-1 text-[#C9D1D9] sm:grid-cols-2">
      <span><span className="text-[#FBBF24]">university</span> = "{owner.university}"</span>
      <span><span className="text-[#FBBF24]">major</span> = "{owner.major}"</span>
      <span><span className="text-[#FBBF24]">year</span> = "{owner.year}"</span>
      <span><span className="text-[#FBBF24]">location</span> = "{owner.location}"</span>
    </Item>
    <Item className="flex flex-wrap gap-2 pt-1">
      {owner.focusAreas.map((f) => (
        <span key={f} className="rounded border border-[#10B981]/40 bg-[#10B981]/10 px-2 py-0.5 text-xs text-[#10B981]">{f}</span>
      ))}
    </Item>
  </Stagger>
);

export const TextLine = ({ entry }) => (
  <p className={entry.tone === "warn" ? "text-[#FBBF24]" : entry.tone === "ok" ? "text-[#10B981]" : "text-[#C9D1D9]"}>
    <Typewriter text={entry.text} />
  </p>
);

export const NotFound = ({ entry }) => (
  <p className="text-[#F87171]">shrsh: command not found: {entry.arg} <span className="text-[#8B949E]">— try 'help'</span></p>
);

export const Ls = ({ run }) => (
  <div className="flex flex-wrap gap-x-6 gap-y-1">
    {[["about.txt", "cat about.txt"], ["projects/", "ls projects/"], ["skills.json", "cat skills.json"], ["resume.pdf", "cat resume.pdf"]].map(([f, c]) => (
      <button key={f} data-testid={`ls-${f}`} onClick={() => run(c)} className={f.endsWith("/") ? "text-[#38BDF8] hover:underline" : "text-[#F0F6FC] hover:underline"}>{f}</button>
    ))}
  </div>
);

export const DateOut = () => <p className="text-[#C9D1D9]">{new Date().toString()}</p>;
