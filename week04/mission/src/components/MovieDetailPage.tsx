import { useParams } from 'react-router-dom';
import { type ProfileType, type Movie } from '../types/movies';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import NotFound from '../pages/NotFound';

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<Movie>();
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [profiles, setProfiles] = useState<ProfileType>();

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        setIsPending(true);
        setIsError(false);

        const [detailres, profileres] = await Promise.all([
          axios.get<Movie>(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }),
          await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }),
        ]);
        setProfiles(profileres.data);
        setMovie(detailres.data);
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
    <div className='bg-black'>
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
        <h1 className='font-bold text-5xl mb-11 text-white'>감독/출연</h1>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7  ">
        {profiles?.cast.map((profile) => (
          <div key={profile.id}>
            <img className='rounded-full size-30 p-3'
              src={`https://image.tmdb.org/t/p/w1280/${profile.profile_path}`}
              alt="프로필 사진"
            />
            <h5 className='text-white'>{profile.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetailPage;
