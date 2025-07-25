import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// Определяем интерфейс Theme
export interface Theme {
  background: string;
  text: string;
  border: string;
  todoBg: string;
  inputBg: string;
  inputText: string;
  placeholder: string;
}

// Определяем константы тем
export const lightTheme: Theme = {
  background: '#f0f0f0',
  text: '#111',
  border: '#cccccc',
  todoBg: '#FFF',
  inputBg: '#eee',
  inputText: '#111',
  placeholder: '#888',
};

export const darkTheme: Theme = {
  background: '#161a2b',
  text: '#fff',
  border: '#444444',
  todoBg: '#1f2338',
  inputBg: 'transparent',
  inputText: '#fff',
  placeholder: '#aaa',
};

// Интерфейс для контекста
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Хук для использования темы
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
