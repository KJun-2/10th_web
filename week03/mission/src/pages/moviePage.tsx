import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Movie, MovieResponse } from '../types/movies';
import MovieCard from '../components/MovieCard';

function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
        },
      });
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
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
  );
}

export default MoviePage;
