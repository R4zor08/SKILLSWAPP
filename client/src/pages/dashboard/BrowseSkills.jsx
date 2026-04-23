import { useEffect, useState } from 'react';
import { skillService } from '../../services/skillService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { ProfileHeader } from '../../components/profile/ProfileHeader.jsx';
import { SearchBar } from '../../components/common/SearchBar.jsx';
import { SkillFilter } from '../../components/skills/SkillFilter.jsx';
import { SkillList } from '../../components/skills/SkillList.jsx';
import { Pagination } from '../../components/common/Pagination.jsx';
import { EmptyState } from '../../components/common/EmptyState.jsx';
import { BrowseSkillsSkeleton } from '../../components/common/Skeleton.jsx';
import { getErrorMessage } from '../../utils/helpers.js';

export function BrowseSkills() {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search, 350);
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [result, setResult] = useState({ items: [], total: 0, pages: 1 });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const res = await skillService.list({ search: debounced, type, category, page, limit: 12 });
        if (!cancelled) setResult(res.data.data);
      } catch (e) {
        if (!cancelled) setError(getErrorMessage(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debounced, type, category, page]);

  return (
    <div>
      <ProfileHeader title="Browse skills" description="Discover what the community offers and wants." />
      {error && <div className="alert error">{error}</div>}
      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search skills, tags, descriptions…" />
        <SkillFilter type={type} onTypeChange={(v) => { setPage(1); setType(v); }} category={category} onCategoryChange={(v) => { setPage(1); setCategory(v); }} />
      </div>
      {loading ? (
        <BrowseSkillsSkeleton />
      ) : result.items?.length ? (
        <>
          <SkillList skills={result.items} />
          <Pagination page={page} totalPages={result.pages || 1} onPageChange={setPage} />
        </>
      ) : (
        <EmptyState
          title="No skills found"
          description="Try adjusting filters or search."
          visual={<span className="empty-icon">⌕</span>}
        />
      )}
    </div>
  );
}
