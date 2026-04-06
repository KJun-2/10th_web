import { useState } from 'react';
import type { Movie } from '../types/movies';
import { useNavigate } from 'react-router-dom';

interface MoveCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MoveCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer
      w-44 transition-transform duration-600 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.name}
      />

      {isHovered && (
        <div
          className="absolute inset-0  from-black/50 to-transparent 
        backdrop-blur-md text-white flex flex-col justify-center items-center p-4">
          <h2 className="text-lg font-bold">{movie.name}</h2>
          <p className="text-sm text-gray-50 leading-relaxed mt-2 line-clamp-5">{movie.overview}</p>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
