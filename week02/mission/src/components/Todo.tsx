import { useTodo } from '../context/TodoContext';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import ThemeToggleButton from '../context/ThemeToggleButton';
import { THEME, useTheme } from '../context/ThemeProvider';
import clsx from 'clsx';

function Todo() {
  const { deleteTask, doneTask, todos, doneTodos } = useTodo();

  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;
  return (
    <div className={clsx(isLightMode ? 'bg-white' : 'bg-gray-800')}>
      <nav className={clsx('p-4 w-full flex justifiy-end', isLightMode ? 'bg-white' : 'bg-gray-800')}>
        <ThemeToggleButton />
      </nav>
      <h1 className="todo-container__header">To DO</h1>

      <TodoForm />
      <div className="render-container">
        <TodoList
          title="할일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#27a745"
          onClick={doneTask}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          onClick={deleteTask}
        />
      </div>
    </div>
  );
}

export default Todo;
