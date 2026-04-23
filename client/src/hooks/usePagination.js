import { useMemo, useState } from 'react';

export function usePagination(totalItems, pageSize) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil((totalItems || 0) / pageSize)), [totalItems, pageSize]);

  const sliceRange = useMemo(() => {
    const start = (page - 1) * pageSize;
    return { start, end: start + pageSize };
  }, [page, pageSize]);

  return { page, setPage, totalPages, sliceRange };
}
