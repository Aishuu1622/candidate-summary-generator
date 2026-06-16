import { FiStar } from "react-icons/fi";
import ResultCard from "./ResultCard.jsx";

export default function SkillsCard({ skills }) {
  return (
    <ResultCard
      title="Skills Discussed"
      icon={FiStar}
      accent="text-success"
      iconClassName="bg-success/15 text-success"
    >
      {skills?.length ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-success/15 px-4 py-1.5 text-sm font-semibold text-green-200 ring-1 ring-success/15"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-slate-300">No technical skills were identified.</p>
      )}
    </ResultCard>
  );
}
