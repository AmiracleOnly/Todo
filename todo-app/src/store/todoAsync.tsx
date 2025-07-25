import {createAsyncThunk} from '@reduxjs/toolkit'
import { fetchTodos, createTodo, deleteTodo, toggleTodo, editTodo,} from '../api/todos';


export const fetchTodosAsync = createAsyncThunk(
    'todos/fetchTodos',
    async ({ page, limit }: { page: number; limit: number }) => {
      const response = await fetchTodos(page, limit);
      return response;
    }
  );

  export const createTodoAsync = createAsyncThunk('todos/createTodo', async (text: string) => {
    return await createTodo(text);
  });

  export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo', async (id: number) => {
    await deleteTodo(id);
    return id;
  });

  export const toggleTodoAsync = createAsyncThunk('todos/toggleTodo', async (id: number) => {
    return await toggleTodo(id);
  });

  export const editTodoAsync = createAsyncThunk('todos/editTodo', async ({id, text, completed}:
    {id: number, text: string, completed: boolean}) => {
      return await editTodo(id, text, completed)
    }
  )
