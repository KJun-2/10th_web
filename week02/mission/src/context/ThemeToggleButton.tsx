import React from 'react';
import { useTheme, THEME } from './ThemeProvider';
import clsx from 'clsx';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx('px-4 py-2 mt-4 rounded-md font-medium transition-all duration-300 border', {
        'bg-black text-white border-black': isLightMode,
        'bg-white text-black border-white': !isLightMode,
      })}>
      {isLightMode ? '🌙 DARK MODE' : '☀️ LIGHT MODE'}
    </button>
  );
};

export default ThemeToggleButton;
