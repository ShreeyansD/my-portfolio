import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { skills } from "../../data/portfolio";
import { Stagger, Item } from "./Typewriter";

const Node = ({ k, vals, last }) => {
  const [open, setOpen] = useState(true);
  return (
    <Item className="pl-4">
      <button data-testid={`skills-node-${k}`} onClick={() => setOpen(!open)} className="inline-flex items-center gap-1 text-left">
        <ChevronRight className={`h-3 w-3 text-[#6E7681] transition-transform ${open ? "rotate-90" : ""}`} />
        <span className="text-[#C084FC]">"{k}"</span><span className="text-[#8B949E]">: [</span>
        {!open && <span className="text-[#6E7681]"> …{vals.length} items ]{last ? "" : ","}</span>}
      </button>
      {open && (
        <>
          <div className="flex flex-wrap gap-x-2 gap-y-1 pl-8">
            {vals.map((v, i) => (
              <span key={v}><span className="text-[#A7F3D0]">"{v}"</span><span className="text-[#8B949E]">{i < vals.length - 1 ? "," : ""}</span></span>
            ))}
          </div>
          <span className="pl-4 text-[#8B949E]">]{last ? "" : ","}</span>
        </>
      )}
    </Item>
  );
};

export const Skills = () => {
  const keys = Object.keys(skills);
  return (
    <Stagger className="rounded-lg border border-[#30363D] bg-[#0D1117] p-4" >
      <Item className="mb-1 text-xs text-[#6E7681]">// skills.json — click a key to fold</Item>
      <Item className="text-[#8B949E]">{"{"}</Item>
      {keys.map((k, i) => <Node key={k} k={k} vals={skills[k]} last={i === keys.length - 1} />)}
      <Item className="text-[#8B949E]">{"}"}</Item>
    </Stagger>
  );
};
