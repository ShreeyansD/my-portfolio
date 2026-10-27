import { motion } from "framer-motion";
import { Folder, Github, ExternalLink } from "lucide-react";
import { projects } from "../../data/portfolio";

const Card = ({ p, i }) => (
  <motion.article
    data-testid={`project-card-${p.slug}`}
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -3 }}
    className="group relative flex flex-col rounded-lg border border-[#30363D] bg-[#0D1117] p-4 transition-colors hover:border-[#38BDF8]/60 hover:shadow-[0_0_30px_-12px_#38BDF8]"
  >
    <div className="flex items-center gap-2 text-xs text-[#6E7681]">
      <span>drwxr-xr-x</span><span className="ml-auto">./{String(i + 1).padStart(2, "0")}</span>
    </div>
    <h3 className="mt-2 flex items-center gap-2 text-base font-semibold text-[#C084FC]">
      <Folder className="h-4 w-4 text-[#FBBF24]" /> {p.slug}/
    </h3>
    <p className="mt-1 text-xs text-[#8B949E]">{p.name}</p>
    <dl className="mt-3 space-y-2 text-xs leading-relaxed">
      <div><dt className="inline text-[#F472B6]">problem: </dt><dd className="inline text-[#C9D1D9]">{p.problem}</dd></div>
      <div><dt className="inline text-[#10B981]">solution: </dt><dd className="inline text-[#C9D1D9]">{p.solution}</dd></div>
    </dl>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {p.tags.map((t) => <span key={t} className="rounded bg-[#38BDF8]/10 px-2 py-0.5 text-[11px] text-[#38BDF8]">{t}</span>)}
    </div>
    <div className="mt-4 flex gap-4 border-t border-[#30363D] pt-3 text-xs">
      <a data-testid={`project-github-${p.slug}`} href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#F0F6FC] hover:text-[#10B981]">
        <Github className="h-3.5 w-3.5" /> source
      </a>
      {p.demo && (
        <a data-testid={`project-demo-${p.slug}`} href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#F0F6FC] hover:text-[#38BDF8]">
          <ExternalLink className="h-3.5 w-3.5" /> live demo
        </a>
      )}
    </div>
  </motion.article>
);

export const Projects = () => (
  <div data-testid="projects-output">
    <p className="mb-3 text-[#6E7681]">total {projects.length} — click a link to open</p>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {projects.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
    </div>
  </div>
);
