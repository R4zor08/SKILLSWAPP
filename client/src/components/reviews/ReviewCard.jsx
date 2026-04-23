import { formatDate } from '../../utils/formatters.js';
import { RatingStars } from './RatingStars.jsx';

export function ReviewCard({ review }) {
  return (
    <article className="card pad-md">
      <div className="review-head">
        <div>
          <strong>{review.reviewerId?.name || 'User'}</strong>
          <p className="muted sm">{formatDate(review.createdAt)}</p>
        </div>
        <RatingStars value={review.rating} readOnly />
      </div>
      <p>{review.comment || 'No comment'}</p>
    </article>
  );
}
