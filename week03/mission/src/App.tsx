import React from 'react';

interface page {
  id: number;
  name: string;
  url: string;
}
const pages: page[] = [
  {
    id: 1,
    name: 'home',
    url: '/home',
  },
  {
    id: 2,
    name: 'GyeongJun',

    url: '/GyeongJun',
  },
  {
    id: 3,
    name: 'Memo',

    url: '/MeMo',
  },
  {
    id: 4,
    name: 'Context',

    url: '/Context',
  },
];
function App() {
  return (
    <div>
      <button>pages.naem</button>
    </div>
  );
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MoviePage from './pages/moviePage';

function App() {
  return <MoviePage></MoviePage>;
}

export default App;
