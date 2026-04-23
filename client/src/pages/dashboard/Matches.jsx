import { useEffect, useState } from 'react';
import { matchService } from '../../services/matchService.js';
import { ProfileHeader } from '../../components/profile/ProfileHeader.jsx';
import { MatchSuggestions } from '../../components/dashboard/MatchSuggestions.jsx';
import { Loader } from '../../components/common/Loader.jsx';
import { getErrorMessage } from '../../utils/helpers.js';

export function Matches() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await matchService.list();
        setMatches(res.data.data.matches || []);
      } catch (e) {
        setError(getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <ProfileHeader title="Matches" description="People whose skills complement yours." />
      {error && <div className="alert error">{error}</div>}
      {loading ? <Loader /> : <MatchSuggestions matches={matches} />}
    </div>
  );
}
