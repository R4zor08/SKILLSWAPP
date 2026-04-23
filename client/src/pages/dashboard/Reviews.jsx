import { useEffect, useState } from 'react';
import { reviewService } from '../../services/reviewService.js';
import { useAuth } from '../../hooks/useAuth.js';
import { ProfileHeader } from '../../components/profile/ProfileHeader.jsx';
import { ReviewCard } from '../../components/reviews/ReviewCard.jsx';
import { ReviewForm } from '../../components/reviews/ReviewForm.jsx';
import { Loader } from '../../components/common/Loader.jsx';
import { getErrorMessage } from '../../utils/helpers.js';

export function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      const res = await reviewService.listForUser(user._id);
      setReviews(res.data.data.reviews || []);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user._id]);

  return (
    <div>
      <ProfileHeader title="Reviews" description="Feedback from completed skill swaps." />
      {error && <div className="alert error">{error}</div>}
      <section className="card pad-lg mb-lg">
        <h2>Leave a review</h2>
        <p className="muted sm">After a swap is completed, rate your partner. Use IDs from your completed swaps.</p>
        <ReviewForm
          submitting={submitting}
          onSubmit={async (payload) => {
            setSubmitting(true);
            try {
              await reviewService.create(payload);
              await load();
            } catch (e) {
              setError(getErrorMessage(e));
            } finally {
              setSubmitting(false);
            }
          }}
        />
      </section>
      {loading ? (
        <Loader />
      ) : (
        <div className="stack">
          {reviews.map((r) => (
            <ReviewCard key={r._id} review={r} />
          ))}
        </div>
      )}
    </div>
  );
}
