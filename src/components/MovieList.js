import React from 'react';
import './MovieList.css';

const MovieList = ({ movies, onMovieClick, onToggleFavorite, isFavorite }) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <div 
            className="movie-poster-container"
            onClick={() => onMovieClick(movie)}
          >
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            ) : (
              <div className="no-poster">No Poster Available</div>
            )}
            <div className="movie-overlay">
              <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
            </div>
          </div>
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-year">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </p>
            <button
              className={`favorite-icon ${isFavorite(movie.id) ? 'favorited' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie);
              }}
              title={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite(movie.id) ? '⭐' : '☆'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
