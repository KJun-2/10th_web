import clsx from 'clsx';
import { useTheme, THEME } from '../context/ContextPractice';

function Button() {
  const { theme, toggleButton } = useTheme();
  const isLight = theme === THEME.LIGHT;
  return (
    <button
      className={clsx('px-4 py-2 mt-4 rounded-md font-medium transition-all duration-300 border', {
        'bg-black text-white border-black': isLight,
        'bg-white text-black border-white': !isLight,
      })}
      onClick={toggleButton}>
      {isLight ? '🌙 DARK MODE' : '☀️ LIGHT MODE'}클릭
    </button>
  );
}

export default Button;
