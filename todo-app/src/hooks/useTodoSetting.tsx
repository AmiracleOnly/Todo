import { useEffect } from 'react';
import {type SelectChangeEvent } from '@mui/material/Select';
import useLocalStorage from './useLocalStorage';

interface TodoSettings {
  page: number;
  setPage: (newPage: number) => void;
  limit: number;
  setLimit: (newLimit: number) => void;
  sort: 'newest' | 'oldest';
  setSort: (newSort: 'newest' | 'oldest') => void;
  handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  handleLimitChange: (event: SelectChangeEvent<string | number>) => void;
  handleSortChange: (event: SelectChangeEvent<'newest' | 'oldest'>) => void;
}

function useTodoSettings(totalPages: number = 1, status: 'idle' | 'loading' | 'succeeded' | 'failed' = 'idle'): TodoSettings {
  const [page, setPage] = useLocalStorage('todoPage', 1);
  const [limit, setLimit] = useLocalStorage('todoLimit', 10);
  const [sort, setSort] = useLocalStorage<'newest' | 'oldest'>('todoSort', 'newest');

  useEffect(() => {
    const displayTotalPages = totalPages || 1;
    if (status === 'succeeded' && totalPages > 0 && page > displayTotalPages) {
      setPage(1);
    }
  }, [status, totalPages, page, setPage]);


  const handlePageChange = (_event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: SelectChangeEvent<string | number>) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    setPage(1);
  };

  const handleSortChange = (event: SelectChangeEvent<'newest' | 'oldest'>) => {
    setSort(event.target.value as 'newest' | 'oldest');
  };

  return {
    page,
    setPage,
    limit,
    setLimit,
    sort,
    setSort,
    handlePageChange,
    handleLimitChange,
    handleSortChange,
  };
}

export default useTodoSettings;
