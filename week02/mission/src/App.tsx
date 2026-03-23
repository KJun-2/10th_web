import './App.css';
import Todo from './components/Todo';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeProvider';
function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Todo></Todo>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
