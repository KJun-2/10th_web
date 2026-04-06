import { useState } from 'react';
import type { MovieResponse } from '../types/movies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { useCustomFetch } from '../customHook/useCustomFetch';

function MoviePage() {
  const [page, setPage] = useState(1);
  const { catagory } = useParams<{ catagory: string }>();

  const url = `https://api.themoviedb.org/3/movie/${catagory}?language=en-US&page=${page}`;

  const { data, isLoading, err } = useCustomFetch<MovieResponse>(url, [page, catagory]);

  if (err) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-red-500 text-3xl font-bold">에러 발생: 데이터를 불러올 수 없습니다.</span>
      </div>
    );
  }

  const movies = data?.results || [];

  return (
    <>
      <div className="flex justify-center items-center gap-6 mt-5">
        <button
          className="disabled:text-gray-400 font-bold text-xl"
          disabled={page === 1 || isLoading}
          onClick={() => setPage((pre) => Math.max(pre - 1, 1))}>
          {'<<'}
        </button>
        <span className="font-medium">{page} 페이지</span>
        <button
          className="disabled:text-gray-400 font-bold text-xl"
          disabled={isLoading}
          onClick={() => setPage((pre) => pre + 1)}>
          {'>>'}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-10">
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
