import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { swapService } from '../../services/swapService.js';
import { progressService } from '../../services/progressService.js';
import { ProfileHeader } from '../../components/profile/ProfileHeader.jsx';
import { ProgressTimeline } from '../../components/progress/ProgressTimeline.jsx';
import { ProgressForm } from '../../components/progress/ProgressForm.jsx';
import { Loader } from '../../components/common/Loader.jsx';
import { getErrorMessage } from '../../utils/helpers.js';

export function ProgressTracking() {
  const [swaps, setSwaps] = useState([]);
  const [swapId, setSwapId] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await swapService.list();
        const list = (res.data.data.swaps || []).filter(
          (s) => s.status === 'accepted' || s.status === 'completed'
        );
        setSwaps(list);
        if (list.length) {
          const first = list[0]._id;
          setSwapId(typeof first === 'string' ? first : String(first));
        } else {
          setSwapId('');
        }
      } catch (e) {
        setError(getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!swapId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await progressService.listBySwap(swapId);
        if (!cancelled) setItems(res.data.data.progress || []);
      } catch (e) {
        if (!cancelled) setError(getErrorMessage(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [swapId]);

  useEffect(() => {
    setSuccess('');
  }, [swapId]);

  if (loading) return <Loader />;

  const noTrackableSwaps = !swaps.length;

  return (
    <div>
      <ProfileHeader title="Progress tracking" description="Log milestones for ongoing swaps." />
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {noTrackableSwaps ? (
        <div className="card pad-lg mb-md">
          <p className="muted mb-md">
            Progress updates can only be added for swaps that are <strong>accepted</strong> or <strong>completed</strong>.
            You do not have any yet—accept a swap request or wait until a partner accepts yours.
          </p>
          <Link to="/dashboard/swaps" className="btn primary sm">
            Go to swap requests
          </Link>
        </div>
      ) : (
        <div className="field max-w-md mb-md">
          <span className="muted sm">Select swap</span>
          <select className="input" value={swapId} onChange={(e) => setSwapId(e.target.value)}>
            {swaps.map((s) => {
              const id = typeof s._id === 'string' ? s._id : String(s._id);
              return (
                <option key={id} value={id}>
                  {s.offeredSkillId?.skillName ?? 'Skill'} ⇄ {s.requestedSkillId?.skillName ?? 'Skill'}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {!noTrackableSwaps && (
        <ProgressForm
          swapId={swapId}
          submitting={submitting}
          onSubmit={async (payload) => {
            setSubmitting(true);
            setError('');
            setSuccess('');
            try {
              await progressService.create(payload);
              const res = await progressService.listBySwap(payload.swapId);
              setItems(res.data.data.progress || []);
              setSuccess('Update added to the timeline.');
              return true;
            } catch (e) {
              setError(getErrorMessage(e));
              return false;
            } finally {
              setSubmitting(false);
            }
          }}
        />
      )}

      <section className="mt-lg">
        <h2>Timeline</h2>
        <ProgressTimeline items={items} />
      </section>
    </div>
  );
}
