import { SkillCard } from './SkillCard.jsx';

export function SkillList({ skills }) {
  if (!skills?.length) return null;
  return (
    <div className="skill-grid">
      {skills.map((s) => (
        <SkillCard key={s._id} skill={s} />
      ))}
    </div>
  );
}
