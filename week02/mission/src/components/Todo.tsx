import clsx from 'clsx';
import React from 'react';
import ThemeToggleButton from '../context/ThemeToggleButton';

function Todo() {
  return (
    <div className="container">
      <div>Todo</div>
      <ThemeToggleButton></ThemeToggleButton>
    </div>
  );
}

export default Todo;
