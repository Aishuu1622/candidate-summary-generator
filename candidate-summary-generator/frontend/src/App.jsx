import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import Header from "./components/Header.jsx";
import ImprovementCard from "./components/ImprovementCard.jsx";
import SkillsCard from "./components/SkillsCard.jsx";
import StrengthCard from "./components/StrengthCard.jsx";
import SummaryCard from "./components/SummaryCard.jsx";
import TranscriptInput from "./components/TranscriptInput.jsx";
import { generateSummary } from "./services/api.js";

function getErrorMessage(error) {
  if (!error.response) {
    return "Unable to reach the backend. Please make sure FastAPI is running.";
  }

  const detail = error.response.data?.detail;
  if (typeof detail === "string") {
    return detail;
  }

  return "The backend returned an unexpected error. Please try again.";
}

function isValidResult(data) {
  return (
    data &&
    typeof data.summary === "string" &&
    Array.isArray(data.skills_discussed) &&
    Array.isArray(data.strengths) &&
    Array.isArray(data.areas_for_improvement)
  );
}

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(4.28);

  const trimmedTranscript = useMemo(() => transcript.trim(), [transcript]);

  function handleTranscriptChange(value) {
    setTranscript(value);
    setResult(null);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!trimmedTranscript) {
      setError("Please paste an interview transcript before generating a summary.");
      return;
    }

    const startedAt = performance.now();
    setIsLoading(true);

    try {
      const data = await generateSummary(trimmedTranscript);
      if (!isValidResult(data)) {
        throw new Error("Invalid API response");
      }

      setResult(data);
      setDuration((performance.now() - startedAt) / 1000);
      setSuccess("Summary generated successfully!");
    } catch (requestError) {
      setError(
        requestError.message === "Invalid API response"
          ? "The API response was invalid. Please check the backend and try again."
          : getErrorMessage(requestError)
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen pb-4 text-slate-100">
      <Header />

      <TranscriptInput
        transcript={transcript}
        setTranscript={handleTranscriptChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {(error || success) && (
        <div className="mx-auto mt-3 max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100"
              >
                <FiAlertCircle className="mt-1 shrink-0 text-xl text-red-300" />
                <p>{error}</p>
              </motion.div>
            ) : success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-3 text-sm text-green-100"
              >
                <FiCheckCircle className="mt-1 shrink-0 text-2xl text-success" />
                <div>
                  <p className="font-medium">{success}</p>
                  <p className="mt-0.5 text-xs text-slate-300">
                    AI analysis completed in {duration.toFixed(2)} seconds
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}

      {result && (
        <section className="mx-auto mt-3 grid max-w-6xl grid-cols-1 gap-3 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <SummaryCard summary={result.summary} />
          <SkillsCard skills={result.skills_discussed} />
          <StrengthCard strengths={result.strengths} />
          <ImprovementCard improvements={result.areas_for_improvement} />
        </section>
      )}
    </main>
  );
}
