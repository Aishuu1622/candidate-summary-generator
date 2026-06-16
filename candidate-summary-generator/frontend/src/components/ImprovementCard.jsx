import { FiBarChart2 } from "react-icons/fi";
import ResultCard from "./ResultCard.jsx";

export default function ImprovementCard({ improvements }) {
  return (
    <ResultCard
      title="Areas for Improvement"
      icon={FiBarChart2}
      accent="text-warning"
      iconClassName="bg-warning/15 text-warning"
    >
      {improvements?.length ? (
        <ul className="space-y-2 text-sm text-slate-200">
          {improvements.map((item) => (
            <li key={item} className="flex gap-3 leading-5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-300">No improvement areas were identified.</p>
      )}
    </ResultCard>
  );
}
