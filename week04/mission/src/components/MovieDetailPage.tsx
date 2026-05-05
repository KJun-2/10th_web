import { useParams } from 'react-router-dom';
import { type ProfileType, type Movie } from '../types/movies';
import LoadingSpinner from './LoadingSpinner';
import NotFound from '../pages/NotFound';
import { useCustomFetch } from '../customHook/useCustomFetch'; // 커스텀 훅 임포트

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const { data: movie, isLoading: isMovieLoading, err: movieError } = useCustomFetch<Movie>(detailUrl, [movieId]);

  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;
  const { data: profiles, isLoading: isCreditsLoading, err: creditsError } = useCustomFetch<ProfileType>(creditsUrl, [movieId]);

  if (isMovieLoading || isCreditsLoading) return <LoadingSpinner />;
  if (movieError || creditsError) return <NotFound />;
  if (!movie) return null;

  return (
    <div className="bg-black p-4 md:p-8 min-h-screen">
      <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-xl overflow-hidden flex items-end">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt={`${movie.title} 배경 이미지`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>

        <div className="relative z-10 w-full p-8 md:p-12 flex flex-col items-start text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">{movie.title}</h2>
          <div className="flex gap-4 text-sm font-medium text-gray-300 mb-4">
            <p className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span> {movie.vote_average?.toFixed(1)}
            </p>
            <p>| {movie.release_date}</p>
          </div>
          <p className="text-xs md:text-sm leading-relaxed text-gray-200 max-w-4xl line-clamp-6 opacity-90">{movie.overview}</p>
        </div>
      </div>

      <h1 className="font-bold text-3xl md:text-5xl mb-11 text-white">감독/출연</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {profiles?.cast?.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col items-center text-center">
            <div className="w-24 h-24 md:w-32 md:h-32 mb-3 overflow-hidden rounded-full border-2 border-gray-800">
              <img
                className="w-full h-full object-cover"
                src={profile.profile_path ? `https://image.tmdb.org/t/p/w185/${profile.profile_path}` : 'https://via.placeholder.com/185x185?text=No+Image'}
                alt={profile.name}
              />
            </div>
            <h5 className="text-white text-sm font-medium line-clamp-2">{profile.name}</h5>
            <p className="text-gray-400 text-xs mt-1">{profile.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetailPage;
