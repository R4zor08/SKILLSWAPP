export function RatingStars({ value, onChange, readOnly }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="stars" role={readOnly ? 'img' : 'group'} aria-label={`Rating ${value} of 5`}>
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          className={`star ${s <= value ? 'on' : ''}`}
          disabled={readOnly}
          onClick={() => onChange?.(s)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
