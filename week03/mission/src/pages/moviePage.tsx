import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Movie, MovieResponse } from '../types/movies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';

function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const { catagory} = useParams<{ catagory: string }>();
  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);

      try {
        const { data } = await axios.get<MovieResponse>(`https://api.themoviedb.org/3/movie/${catagory}?language=en-US&page=${page}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [page, catagory]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-7xl">에러 발생</span>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-center gap-6 mt-5 ">
        <button
          disabled={page === 1}
          onClick={() => {
            setPage((pre) => pre - 1);
          }}>
          {'<<'}
        </button>
        <span>{page} 페이지</span>
        <button
          onClick={() => {
            setPage((pre) => pre + 1);
          }}>
          {'>>'}
        </button>
      </div>
      {isPending && (
        <div className="flex justify-center items-center h-dvh ">
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}

      {!isPending && (
        <ul
          className="grid grid-cols-2 sm:grid-cols-3
      md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-10">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default MoviePage;
