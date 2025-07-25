import { AxiosError } from "axios";
import { type ErrorResponse } from "../types/ErrorType";
import { type Todo } from '../types/data';

import axiosInstance from '../utils/axiosInstance';

export interface TodosResponse {
    data: Todo[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const fetchTodos = async (page: number, limit: number): Promise<TodosResponse> => {
    try {
        console.log('fetching todos using axiosInstance');

        const response = await axiosInstance.get(`/todos`, {
            params: {page, limit},
        });
        console.log('Server response:', response.data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error('ошибка в фэтче', {
            message: axiosError.response?.data?.error || 'ошибка в фэтче тудус',
            status: axiosError.response?.status,
        });
        throw error;
    }
};

export const createTodo = async (text: string): Promise<Todo> => {
    try {
        console.log('creating todo using axiosInstance');

        const response = await axiosInstance.post(`/todos`, {text});

        console.log('todo create successfully', response.data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error('ошибка в создании туду:', {
            message: axiosError.response?.data?.error || 'ошибка в создании туду',
            status: axiosError.response?.status,
        });
        throw error;
    }
};

export const editTodo = async (id: number, text: string, completed: boolean): Promise<Todo> => {
   try {
        console.log('editing todo using axiosInstance');

        const response = await axiosInstance.put(`/todos/${id}`, {text, completed});

        console.log('successfuly editing todo', response.data);
        return response.data;
   } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error('Ошибка в обновлении туду', {
            message: axiosError.response?.data?.error || 'ошибка в редактрировании туду',
            status: axiosError.response?.status,
        });
        throw error;
   }
};



export const deleteTodo = async (id: number): Promise<void> => {
    try {
        console.log('deleting todo using axiosInstance');
        await axiosInstance.delete(`/todos/${id}`);
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error('Error deleting todo:', {
        message: axiosError.response?.data?.error || 'ошибка в удалении туду',
        status: axiosError.response?.status,
      });
      throw error;
    }
  };

export const toggleTodo = async (id: number): Promise<Todo> => {
    try {
        console.log('toggling todo using axiosInstance');
        const response = await axiosInstance.patch(`/todos/${id}/toggle`, {});
        console.log('todo toggled successfully', response.data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error('ошибка в тоглТуду', {
            message: axiosError.response?.data?.error || 'failured toggling todo',
            status: axiosError.response?.status,
        });
        throw error;
    }
};
