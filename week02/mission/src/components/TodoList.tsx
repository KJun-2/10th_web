import type { TTodo } from '../types/todo.ts';

interface TodoListProps {
  title: string;
  todos: TTodo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (todo: TTodo) => void;
}

const TodoList = ({ title, todos, buttonLabel, buttonColor, onClick }: TodoListProps) => {
  return (
    <div className="render-section">
      <h2 className="render-section__title">{title}</h2>
      <ul className="render-section__list">
        {todos.map((todo: TTodo) => (
          <li
            key={todo.id}
            className="render-container__item">
            <span className="rander-container__item-text">{todo.text}</span>
            <button
              onClick={() => onClick(todo)}
              style={{
                backgroundColor: buttonColor,
              }}
              className="render-container__item-button">
              {buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
