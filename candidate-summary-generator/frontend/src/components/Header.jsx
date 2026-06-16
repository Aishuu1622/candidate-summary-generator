import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto max-w-6xl px-4 pt-4 text-center sm:px-6 lg:px-8"
    >
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-primary/40 bg-primary/15 text-2xl text-indigo-300 shadow-glow">
          <FiFileText aria-hidden="true" />
        </div>
        <h1 className="bg-gradient-to-r from-violet via-primary to-blue-400 bg-clip-text text-3xl font-extrabold tracking-normal text-transparent sm:text-4xl">
          Candidate Interview Summary Generator
        </h1>
      </div>
      <p className="mt-2 text-sm text-slate-300 sm:text-base">
        Paste the interview transcript below and generate AI-powered summary
      </p>
    </motion.header>
  );
}
