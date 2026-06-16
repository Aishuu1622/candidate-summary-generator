import { motion } from "framer-motion";

export default function ResultCard({
  title,
  icon: Icon,
  accent,
  iconClassName,
  children,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, borderColor: "rgba(99, 102, 241, 0.55)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-44 overflow-hidden rounded-xl border border-slate-700/80 bg-slate-950/55 p-4 shadow-glow backdrop-blur transition-colors"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className={`grid h-9 w-9 place-items-center rounded-lg text-xl ${iconClassName}`}>
          <Icon aria-hidden="true" />
        </div>
        <h2 className={`text-lg font-bold ${accent}`}>{title}</h2>
      </div>
      <div className="max-h-28 overflow-y-auto pr-1">{children}</div>
    </motion.article>
  );
}
