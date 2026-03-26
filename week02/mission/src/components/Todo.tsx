import Button from './Button';
import { THEME, useTheme } from '../context/ContextPractice';

import clsx from 'clsx';
function Todo() {
  const { theme, toggleButton } = useTheme();
  const isLight = theme === THEME.LIGHT;
  return (
    <div
      className={clsx('items-center w-100 h-100  rounded-[10px]', {
        'bg-black text-white border-black': isLight,
        'bg-white text-black border-white': !isLight,
      })}>
      <h1 className={'text-center text-xl font-bold'}>My Text</h1>
      <Button></Button>
    </div>
  );
}

export default Todo;
