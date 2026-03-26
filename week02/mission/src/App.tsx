import './App.css';
import Todo from './components/Todo';
import ThemeContextProvier from '../src/context/ContextPractice';
function App() {
  return (
    <ThemeContextProvier>
      <Todo></Todo>
    </ThemeContextProvier>
  );
}

export default App;
