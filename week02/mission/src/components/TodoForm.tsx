import React from 'react';
import { useTodo } from '../context/TodoContext';
import { useState } from 'react';

const TodoForm = () => {
  const { addTodo } = useTodo();
  const [input, setInput] = useState<string>('');
  const handleSummit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      addTodo(text);
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSummit}
      name="form"
      className="todo-container__form">
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        type="text"
        name="input"
        className="todo-container__input"
        placeholder="할 일 입력"></input>
      <button className="todo-container__button">할 일 추가</button>
    </form>
  );
};

export default TodoForm;
