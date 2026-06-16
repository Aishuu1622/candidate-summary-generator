import { motion } from "framer-motion";
import { FiEdit3, FiLoader, FiZap } from "react-icons/fi";

export default function TranscriptInput({
  transcript,
  setTranscript,
  onSubmit,
  isLoading,
}) {
  const characterCount = transcript.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
      className="mx-auto mt-4 max-w-6xl px-4 sm:px-6 lg:px-8"
    >
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="rounded-xl border border-slate-700/80 bg-slate-950/55 p-4 shadow-glow backdrop-blur">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-3 font-semibold text-violet-300">
              <FiEdit3 className="text-lg" aria-hidden="true" />
              <span>Interview Transcript</span>
            </div>
            <span className="text-slate-300">{characterCount} characters</span>
          </div>

          <textarea
            value={transcript}
            onChange={(event) => setTranscript(event.target.value)}
            placeholder="Paste interview transcript here..."
            spellCheck="true"
            className="h-32 w-full resize-none rounded-lg border border-slate-700 bg-slate-950/70 p-4 font-mono text-sm leading-6 text-slate-100 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </div>

        <div className="flex justify-center">
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-violet to-primary px-6 py-2.5 text-base font-bold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <FiLoader className="animate-spin text-xl" aria-hidden="true" />
            ) : (
              <FiZap className="text-xl" aria-hidden="true" />
            )}
            {isLoading ? "Generating..." : "Generate Summary"}
          </motion.button>
        </div>
      </form>
    </motion.section>
  );
}
