import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTodosAsync } from '../store/todoAsync';
import {type Todo} from '../types/data'

interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalPages: number;
}

function useTodos(page: number, limit: number): TodosState {
  const dispatch = useAppDispatch();
  const { todos, status, error, totalPages } = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodosAsync({ page, limit }));
  }, [dispatch, page, limit]);

  return { todos, status, error, totalPages };
}

export default useTodos;
