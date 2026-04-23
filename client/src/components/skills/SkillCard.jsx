import { Link } from 'react-router-dom';

export function SkillCard({ skill }) {
  const owner = skill.userId;
  return (
    <article className="skill-card card pad-md">
      <div className="skill-card-top">
        <span className={`pill ${skill.type === 'offered' ? 'pill-green' : 'pill-blue'}`}>{skill.type}</span>
        <span className="muted sm">{skill.category}</span>
      </div>
      <h3>{skill.skillName}</h3>
      <p className="muted sm">{skill.description || 'No description'}</p>
      <div className="skill-meta">
        <span className="badge ghost">{skill.level}</span>
        {skill.tags?.slice(0, 3).map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      {owner?.name && (
        <div className="skill-owner">
          <span className="muted sm">by </span>
          <Link to={`/dashboard/profile?user=${owner._id || owner}`} className="link">
            {owner.name}
          </Link>
        </div>
      )}
    </article>
  );
}
