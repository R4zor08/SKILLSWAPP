import { useEffect, useState } from 'react';
import { swapService } from '../../services/swapService.js';
import { useAuth } from '../../hooks/useAuth.js';
import { ProfileHeader } from '../../components/profile/ProfileHeader.jsx';
import { SwapRequestCard } from '../../components/swaps/SwapRequestCard.jsx';
import { Loader } from '../../components/common/Loader.jsx';
import { getErrorMessage } from '../../utils/helpers.js';

export function SwapRequests() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [swaps, setSwaps] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await swapService.list();
      setSwaps(res.data.data.swaps || []);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const act = async (fn, id) => {
    try {
      await fn(id);
      await load();
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  return (
    <div>
      <ProfileHeader title="Swap requests" description="Accept, reject, cancel, or complete your skill exchanges." />
      {error && <div className="alert error">{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <div className="stack">
          {swaps.map((s) => (
            <SwapRequestCard
              key={s._id}
              swap={s}
              currentUserId={user._id}
              onAccept={(id) => act(swapService.accept, id)}
              onReject={(id) => act(swapService.reject, id)}
              onCancel={(id) => act(swapService.cancel, id)}
              onComplete={(id) => act(swapService.complete, id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
