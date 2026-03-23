import { useTodo } from '../context/TodoContext';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
function Todo() {
  const { deleteTask, doneTask, todos, doneTodos } = useTodo();

  return (
    <div className="todo-container">
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
