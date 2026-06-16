import { FiTrendingUp } from "react-icons/fi";
import ResultCard from "./ResultCard.jsx";

export default function StrengthCard({ strengths }) {
  return (
    <ResultCard
      title="Key Strengths"
      icon={FiTrendingUp}
      accent="text-blue-400"
      iconClassName="bg-blue-500/15 text-blue-400"
    >
      <BulletList
        items={strengths}
        markerClassName="bg-blue-400"
        empty="No strengths were identified."
      />
    </ResultCard>
  );
}

function BulletList({ items, markerClassName, empty }) {
  if (!items?.length) {
    return <p className="text-slate-300">{empty}</p>;
  }

  return (
    <ul className="space-y-2 text-sm text-slate-200">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-5">
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${markerClassName}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
