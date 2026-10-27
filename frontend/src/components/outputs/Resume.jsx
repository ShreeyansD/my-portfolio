import { motion } from "framer-motion";
import { Download, FileText, Eye } from "lucide-react";
import { owner, resume, skills } from "../../data/portfolio";

export const Resume = () => (
  <motion.div
    data-testid="resume-output"
    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
    className="grid max-w-3xl grid-cols-1 overflow-hidden rounded-lg border border-[#30363D] bg-[#0D1117] sm:grid-cols-[1fr_auto]"
  >
    <div className="p-5">
      <div className="flex items-center gap-2 text-xs text-[#6E7681]"><FileText className="h-4 w-4 text-[#F87171]" /> resume.pdf · preview</div>
      <h3 className="mt-3 text-lg font-bold text-[#F0F6FC]">{owner.name}</h3>
      <p className="text-xs text-[#8B949E]">{owner.role}</p>
      <p className="mt-4 text-xs uppercase tracking-widest text-[#FBBF24]">education</p>
      <p className="mt-1 text-[#C9D1D9]">{resume.education}</p>
      <p className="mt-4 text-xs uppercase tracking-widest text-[#FBBF24]">highlights</p>
      <ul className="mt-1 space-y-1 text-[#C9D1D9]">
        {resume.highlights.map((h) => <li key={h}><span className="text-[#10B981]">▸</span> {h}</li>)}
      </ul>
      <p className="mt-4 text-xs uppercase tracking-widest text-[#FBBF24]">core stack</p>
      <p className="mt-1 text-[#C9D1D9]">{[...skills.languages.slice(0, 3), ...skills.frameworks.slice(0, 3)].join(" · ")}</p>
    </div>
    <div className="flex flex-row gap-3 border-t border-[#30363D] p-5 sm:flex-col sm:justify-start sm:border-l sm:border-t-0 [&>a]:sm:flex-none">
      <a data-testid="resume-download-btn" href={owner.resumeUrl} download className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#10B981] px-4 py-2.5 text-xs font-semibold text-[#0A0B10] transition-shadow hover:shadow-[0_0_24px_-4px_#10B981]">
        <Download className="h-4 w-4" /> download
      </a>
      <a data-testid="resume-open-btn" href={owner.resumeUrl} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#30363D] px-4 py-2.5 text-xs text-[#F0F6FC] hover:border-[#38BDF8]">
        <Eye className="h-4 w-4" /> open
      </a>
    </div>
  </motion.div>
);
