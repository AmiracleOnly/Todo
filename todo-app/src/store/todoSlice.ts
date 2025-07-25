import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchTodosAsync, createTodoAsync, toggleTodoAsync, deleteTodoAsync, editTodoAsync } from './todoAsync'; // Убедитесь, что все асинхронные экшены импортированы
import { type Todo } from '../types/data';

export type TodoStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type SortOrder = 'newest' | 'oldest';

interface TodoState {
  todos: Todo[];
  status: TodoStatus;
  error: string | null;
  total: number;
  page: number;
  limit: 5 | 10 | 20;
  totalPages: number;
  sort: SortOrder;
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  sort: 'newest',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<5 | 10 | 20>) => {
      state.limit = action.payload;
    },
    setSort: (state, action: PayloadAction<SortOrder>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = 'succeeded';
        state.todos.unshift(action.payload);
        state.total++;
        state.totalPages = Math.ceil(state.total / state.limit);

        const startIndex = (state.page - 1) * state.limit;
        const endIndex = state.page * state.limit;
        state.todos = state.todos.slice(startIndex, endIndex);
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.limit = action.payload.limit as (5 | 10 | 20);
        if (state.page > state.totalPages && state.totalPages > 0) {
          state.page = state.totalPages;
        } else if (state.totalPages === 0 && state.page !== 1) {
          state.page = 1;
        }
      })

      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index].completed = action.payload.completed;
        }
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
      //   state.todos = state.todos.filter(todo => todo.id !== action.payload);
      //   state.total--;
      //   state.totalPages = Math.ceil(state.total / state.limit);
      //   if (state.total > 0 && state.page > state.totalPages) {
      //     state.page = state.totalPages;
      //   } else if (state.total === 0) {
      //     state.page = 1;
      //   }
      // })
      state.status = 'succeeded';
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.total--;
      state.totalPages = Math.ceil(state.total / state.limit);
      const expectedTodos = Math.min(state.limit, state.total - (state.page - 1) * state.limit);
      if (state.todos.length < expectedTodos && state.total > 0 && state.page > 1) {
        state.page--;
      } else if (state.total === 0) {
        state.page = 1;
      }
      console.log('deleteTodoAsync.fulfilled: todos=', state.todos.length, 'page=', state.page, 'total=', state.total);
    })
      .addCase(editTodoAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.todos.findIndex(todo => todo.id === action.payload.id)
        if(index !== -1){
          state.todos[index] = action.payload;
          state.todos = [...state.todos]
        }
      })
      .addCase(editTodoAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'failed to edit todo'
      })
  },
});

export const { setPage, setLimit, setSort } = todoSlice.actions;
export default todoSlice.reducer;
