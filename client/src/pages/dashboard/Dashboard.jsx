import { useEffect, useState } from 'react';
import { matchService } from '../../services/matchService.js';
import { skillService } from '../../services/skillService.js';
import { swapService } from '../../services/swapService.js';
import { useAuth } from '../../hooks/useAuth.js';
import { ProfileHeader } from '../../components/profile/ProfileHeader.jsx';
import { DashboardStats } from '../../components/dashboard/DashboardStats.jsx';
import { RecentRequests } from '../../components/dashboard/RecentRequests.jsx';
import { MatchSuggestions } from '../../components/dashboard/MatchSuggestions.jsx';
import { OngoingSwaps } from '../../components/dashboard/OngoingSwaps.jsx';
import { Loader } from '../../components/common/Loader.jsx';
import { getErrorMessage } from '../../utils/helpers.js';

export function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [skills, setSkills] = useState({ offered: 0, wanted: 0 });
  const [swaps, setSwaps] = useState([]);
  const [matches, setMatches] = useState([]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [skillRes, swapRes, matchRes] = await Promise.all([
        skillService.list({ userId: user._id, limit: 100 }),
        swapService.list(),
        matchService.list(),
      ]);
      const items = skillRes.data.data.items || [];
      setSkills({
        offered: items.filter((s) => s.type === 'offered').length,
        wanted: items.filter((s) => s.type === 'wanted').length,
      });
      const swapList = swapRes.data.data.swaps || [];
      setSwaps(swapList);
      setMatches(matchRes.data.data.matches || []);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const activeSwaps = swaps.filter((s) => s.status === 'pending' || s.status === 'accepted').length;
  const bestMatch = matches[0]?.score ?? '—';

  const handleSwapAction = async (type, id) => {
    const fn =
      type === 'accept'
        ? swapService.accept
        : type === 'reject'
          ? swapService.reject
          : type === 'cancel'
            ? swapService.cancel
            : swapService.complete;
    await fn(id);
    await load();
  };

  if (loading) return <Loader />;

  return (
    <>
      <ProfileHeader title={`Hello, ${user?.name?.split(' ')[0] || 'there'}`} description="Here is your SkillSwap overview." />
      {error && <div className="alert error">{error}</div>}
      <DashboardStats
        stats={{
          ...skills,
          activeSwaps,
          bestMatch,
        }}
      />
      <div className="grid-2 dashboard-panels">
        <section className="card pad-lg">
          <h2>Match suggestions</h2>
          <MatchSuggestions matches={matches} />
        </section>
        <section className="card pad-lg">
          <h2>Ongoing swaps</h2>
          <OngoingSwaps swaps={swaps} />
        </section>
      </div>
      <section className="card pad-lg mt-lg">
        <h2>Recent requests</h2>
        <RecentRequests
          swaps={swaps}
          currentUserId={user._id}
          onAccept={(id) => handleSwapAction('accept', id)}
          onReject={(id) => handleSwapAction('reject', id)}
          onCancel={(id) => handleSwapAction('cancel', id)}
          onComplete={(id) => handleSwapAction('complete', id)}
        />
      </section>
    </>
  );
}
