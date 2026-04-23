import { useState } from 'react';
import { RatingStars } from './RatingStars.jsx';

export function ReviewForm({ onSubmit, submitting }) {
  const [rating, setRating] = useState(5);
  const [swapId, setSwapId] = useState('');
  const [revieweeId, setRevieweeId] = useState('');
  const [comment, setComment] = useState('');

  return (
    <form
      className="card pad-lg form-grid"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ swapId, revieweeId, rating, comment });
      }}
    >
      <label className="field full">
        <span>Swap ID</span>
        <input className="input" value={swapId} onChange={(e) => setSwapId(e.target.value)} required />
      </label>
      <label className="field full">
        <span>Reviewee user ID</span>
        <input className="input" value={revieweeId} onChange={(e) => setRevieweeId(e.target.value)} required />
      </label>
      <div className="field full">
        <span>Rating</span>
        <RatingStars value={rating} onChange={setRating} />
      </div>
      <label className="field full">
        <span>Comment</span>
        <textarea className="input" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <button type="submit" className="btn primary" disabled={submitting}>
        Submit review
      </button>
    </form>
  );
}
