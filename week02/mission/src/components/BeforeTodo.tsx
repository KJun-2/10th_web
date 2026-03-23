import { useState } from 'react';
import type { TTodo } from '../types/todo';

function Todo() {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState('');

  const handleSummit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      const newTodo = { id: Date.now(), text };
      setTodos((prev): TTodo[] => [...prev, newTodo]);
      setInput('');
    }
  };

  const doneTask = (todo: TTodo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => [...prev, todo]);
  };

  const deleteTask = (done: TTodo) => {
    setDoneTodos(doneTodos.filter((t) => t.id !== done.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">To DO</h1>
      <form
        onSubmit={handleSummit}
        name="form"
        className="todo-container__form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="input"
          className="todo-container__input"
          placeholder="할 일 입력"></input>
        <button className="todo-container__button">할 일 추가</button>
      </form>

      <div className="render-container">
        <div className="render-section">
          <h2 className="render-section__title">할 일</h2>
          <ul className="render-section__list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="render-container__item">
                <span className="rander-container__item-text">{todo.text}</span>
                <button
                  onClick={() => doneTask(todo)}
                  style={{
                    backgroundColor: 'green',
                  }}
                  className="render-container__item-button">
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="render-section">
          <h2 className="render-section__title">완료</h2>
          <ul className="render-section__list">
            {doneTodos.map((done) => (
              <li
                key={done.id}
                className="render-container__item">
                <span className="render-container__item-text">{done.text}</span>
                <button
                  onClick={() => deleteTask(done)}
                  style={{ backgroundColor: 'red' }}
                  className="render-container__item-button">
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
