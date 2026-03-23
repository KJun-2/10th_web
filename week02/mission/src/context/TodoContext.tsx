import type { TTodo } from '../types/todo';
import { useContext, createContext, type PropsWithChildren, useState } from 'react';
interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  addTodo: (text: string) => void;
  doneTask: (todo: TTodo) => void;
  deleteTask: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo = (text: string): void => {
    const newTodo = { id: Date.now(), text };
    setTodos((prev): TTodo[] => [...prev, newTodo]);
  };

  const doneTask = (todo: TTodo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => [...prev, todo]);
  };

  const deleteTask = (done: TTodo) => {
    setDoneTodos(doneTodos.filter((t) => t.id !== done.id));
  };

  return <TodoContext.Provider value={{ todos, doneTodos, addTodo, doneTask, deleteTask }}>{children}</TodoContext.Provider>;
};

export const useTodo = (): ITodoContext => {
  // provider 유무 확인
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo를 사용하기 위해서 TodoProvider로 감싸줘야함');
  }
  return context;
};
