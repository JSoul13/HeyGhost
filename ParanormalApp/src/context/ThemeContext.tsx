import React, {createContext, useState, ReactNode} from 'react';

interface ThemeContextType {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  toggleTheme: () => void;
}

const defaultTheme = {
  primary: '#ff6b6b',
  secondary: '#4ecdc4',
  accent: '#ffe66d',
  background: '#000000',
  text: '#ffffff',
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    // Theme switching logic can be implemented here
    console.log('Theme toggle requested');
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};