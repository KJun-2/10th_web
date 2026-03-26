import { useState, createContext, useContext, type PropsWithChildren } from 'react';

export const THEME = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

export type Theme = (typeof THEME)[keyof typeof THEME];

interface ThemeContext {
  theme: Theme;
  toggleButton: () => void;
}
const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export const ThemeContextProvier = ({ children }: PropsWithChildren) => {
  const [theme, setLightMode] = useState<Theme>(THEME.LIGHT);
  const toggleButton = () => {
    setLightMode((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };
  return <ThemeContext.Provider value={{ theme, toggleButton }}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvier;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('감싸줘야함');
  }
  return context;
};
