import { useParams } from 'react-router-dom';
import type { Movie } from '../types/movies';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import NotFound from '../pages/NotFound';

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<Movie>();
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        setIsPending(true);
        setIsError(false);

        const { data } = await axios.get<Movie>(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });

        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isPending) return <LoadingSpinner />;
  if (isError) return <NotFound />;
  if (!movie) return null;

  return (
    <>
      <div>
        <div className="relative w-full h-400px md:h-500px mb-8 rounded-xl overflow-hidden flex items-end">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
            alt={`${movie.title} 배경 이미지`}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent"></div>

          <div className="relative z-10 w-full p-8 md:p-12 flex flex-col items-start text-left text-white drop-shadow-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">{movie.title}</h2>

            <div className="flex gap-4 text-sm font-medium text-gray-300 mb-4">
              <p className="flex items-center gap-1">
                <span className="text-yellow-400">⭐</span> {movie.vote_average.toFixed(1)}
              </p>
              <p>| {movie.release_date}</p>
            </div>

            <p className="text-xs md:text-sm leading-relaxed text-gray-200 max-w-4xl line-clamp-5 md:line-clamp-6 opacity-90">{movie.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetailPage;
