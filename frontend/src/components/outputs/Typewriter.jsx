import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const reduce = false; // always animate

export const Typewriter = ({ text, speed = 12, className = "" }) => {
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (n >= text.length) return undefined;
    const t = setTimeout(() => setN((v) => Math.min(text.length, v + 2)), speed);
    return () => clearTimeout(t);
  }, [n, text, speed]);
  return <span className={className}>{text.slice(0, n)}{n < text.length && <span className="tw-caret">▋</span>}</span>;
};

export const Stagger = ({ children, className = "" }) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="show"
    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
  >
    {children}
  </motion.div>
);

export const Item = ({ children, className = "", ...rest }) => (
  <motion.div
    className={className}
    variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
    {...rest}
  >
    {children}
  </motion.div>
);
