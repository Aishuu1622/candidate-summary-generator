import { FiFileText } from "react-icons/fi";
import ResultCard from "./ResultCard.jsx";

export default function SummaryCard({ summary }) {
  return (
    <ResultCard
      title="Summary"
      icon={FiFileText}
      accent="text-violet-300"
      iconClassName="bg-violet/20 text-violet-300"
    >
      <p className="text-sm leading-6 text-slate-200">
        {summary || "No summary was returned."}
      </p>
    </ResultCard>
  );
}
