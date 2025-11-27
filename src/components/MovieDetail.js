import React from 'react';
import './MovieDetail.css';

const MovieDetail = ({ movie, onClose, onToggleFavorite, isFavorite }) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  
  // Generate search links for the movie
  const movieTitle = encodeURIComponent(movie.title);
  const movieYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const searchQuery = encodeURIComponent(`${movie.title} ${movieYear}`);
  
  // Multiple download/streaming options
  const downloadOptions = [
    {
      name: 'Search on 1337x',
      url: `https://1337x.to/search/${searchQuery}/1/`,
      icon: '🔍'
    },
    {
      name: 'Search on YTS',
      url: `https://yts.mx/browse-movies/${movieTitle}/all/all/0/latest/0/all`,
      icon: '🎬'
    },
    {
      name: 'Watch on Netflix',
      url: `https://www.netflix.com/search?q=${movieTitle}`,
      icon: '📺'
    },
    {
      name: 'Rent on Amazon',
      url: `https://www.amazon.com/s?k=${searchQuery}+movie`,
      icon: '🛒'
    },
    {
      name: 'Watch on Disney+',
      url: `https://www.disneyplus.com/search?q=${movieTitle}`,
      icon: '✨'
    }
  ];

  return (
    <div className="movie-detail-overlay" onClick={onClose}>
      <div className="movie-detail" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="detail-content">
          <div className="detail-poster">
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-poster-large">No Poster Available</div>
            )}
          </div>
          
          <div className="detail-info">
            <h2>{movie.title}</h2>
            
            <div className="movie-meta">
              <span className="rating">⭐ {movie.vote_average?.toFixed(1)}/10</span>
              <span className="release-date">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </span>
              <button
                className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                onClick={() => onToggleFavorite(movie)}
              >
                {isFavorite ? '⭐ Remove from Favorites' : '☆ Add to Favorites'}
              </button>
            </div>
            
            <div className="description">
              <h3>Overview</h3>
              <p>{movie.overview || 'No description available.'}</p>
            </div>
            
            <div className="additional-info">
              <p><strong>Original Language:</strong> {movie.original_language?.toUpperCase()}</p>
              <p><strong>Popularity:</strong> {movie.popularity?.toFixed(0)}</p>
              <p><strong>Vote Count:</strong> {movie.vote_count}</p>
            </div>
            
            <div className="download-section">
              <h3>Watch & Download Options</h3>
              <div className="download-options">
                {downloadOptions.map((option, index) => (
                  <a 
                    key={index}
                    href={option.url} 
                    className="download-option-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="option-icon">{option.icon}</span>
                    <span className="option-name">{option.name}</span>
                  </a>
                ))}
              </div>
              <p className="download-note">
                Note: These links will search for the movie on various platforms. Always use legal streaming services when available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
