import { createContext, type ReactNode } from 'react';
import { useState } from 'react';
import {type Theme, lightTheme, darkTheme, type ThemeContextType } from '../hooks/ThemeUtils';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' ? darkTheme : lightTheme;
    } catch {
      return lightTheme;
    }
  });

  const toggleTheme = () => {
    setTheme((prevTheme: Theme) => {
      const newTheme = prevTheme === lightTheme ? darkTheme : lightTheme;
      try {
        localStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
      } catch {
        console.warn('Failed to save theme to localStorage');
      }
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

