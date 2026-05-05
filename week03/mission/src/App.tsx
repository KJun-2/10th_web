import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MoviePage from './pages/moviePage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import MovieDetailPage from './components/MovieDetailPage';
import { RootLayout } from './layout/root-layout';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: 'movies/:catagory',
        element: <MoviePage></MoviePage>,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
