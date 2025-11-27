import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';

const API_KEY = '0510eb8a0a94b3e13f20f83d366294d1';
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [currentEndpoint, setCurrentEndpoint] = useState('movie/popular');

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    fetchMovies();
  }, []);

  const fetchMovies = async (query = '', endpoint = currentEndpoint, genreId = null) => {
    setLoading(true);
    try {
      let url;
      if (query) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
      } else if (genreId) {
        url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&with_genres=${genreId}`;
      } else {
        url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowFavorites(false);
    if (query.trim() === '') {
      fetchMovies('', currentEndpoint, selectedCategory >= 10 ? selectedCategory : null);
    } else {
      fetchMovies(query);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.id);
    setCurrentEndpoint(category.endpoint);
    setSearchQuery('');
    setShowFavorites(false);
    if (category.genre) {
      fetchMovies('', category.endpoint, category.id);
    } else {
      fetchMovies('', category.endpoint);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null);
  };

  const toggleFavorite = (movie) => {
    let updatedFavorites;
    if (favorites.find(fav => fav.id === movie.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    setSearchQuery('');
  };

  const displayedMovies = showFavorites ? favorites : movies;

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎬 Movie Ordering System</h1>
        <div className="header-controls">
          <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
          <button 
            className={`favorites-btn ${showFavorites ? 'active' : ''}`}
            onClick={toggleShowFavorites}
          >
            ⭐ Favorites ({favorites.length})
          </button>
        </div>
      </header>

      {!showFavorites && (
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

      <main className="App-main">
        {loading ? (
          <div className="loading">Loading movies...</div>
        ) : (
          <>
            {showFavorites && favorites.length === 0 ? (
              <div className="no-favorites">
                <p>No favorites yet! Click the star icon on any movie to add it to your favorites.</p>
              </div>
            ) : (
              <MovieList
                movies={displayedMovies}
                onMovieClick={handleMovieClick}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            )}
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={handleCloseDetail}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite(selectedMovie.id)}
        />
      )}
    </div>
  );
}

export default App;
