import './App.css';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <h1>Count</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        +1
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}>
        -1
      </button>
      <div>{count}</div>
    </>
  );
}
