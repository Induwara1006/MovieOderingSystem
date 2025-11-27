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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentGenreId, setCurrentGenreId] = useState(null);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    fetchMovies();
  }, []);

  // Infinite scroll effect
  useEffect(() => {
    if (showFavorites || !hasMore || loading) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 500) {
        fetchMovies(searchQuery, currentEndpoint, currentGenreId, page + 1, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page, searchQuery, currentEndpoint, currentGenreId, showFavorites]);

  const fetchMovies = async (query = '', endpoint = currentEndpoint, genreId = null, pageNum = 1, append = false) => {
    setLoading(true);
    try {
      let url;
      if (query) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNum}`;
      } else if (genreId) {
        url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&with_genres=${genreId}&page=${pageNum}`;
      } else {
        url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&page=${pageNum}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (append) {
        setMovies(prev => [...prev, ...(data.results || [])]);
      } else {
        setMovies(data.results || []);
      }
      
      setPage(pageNum);
      setHasMore(pageNum < data.total_pages && data.total_pages > 0);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowFavorites(false);
    setPage(1);
    setHasMore(true);
    if (query.trim() === '') {
      const genreId = selectedCategory >= 10 ? selectedCategory : null;
      setCurrentGenreId(genreId);
      fetchMovies('', currentEndpoint, genreId, 1, false);
    } else {
      setCurrentGenreId(null);
      fetchMovies(query, currentEndpoint, null, 1, false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.id);
    setCurrentEndpoint(category.endpoint);
    setSearchQuery('');
    setShowFavorites(false);
    setPage(1);
    setHasMore(true);
    if (category.genre) {
      setCurrentGenreId(category.id);
      fetchMovies('', category.endpoint, category.id, 1, false);
    } else {
      setCurrentGenreId(null);
      fetchMovies('', category.endpoint, null, 1, false);
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
        {showFavorites && favorites.length === 0 ? (
          <div className="no-favorites">
            <p>No favorites yet! Click the star icon on any movie to add it to your favorites.</p>
          </div>
        ) : (
          <>
            <MovieList
              movies={displayedMovies}
              onMovieClick={handleMovieClick}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
            {loading && (
              <div className="loading">Loading more movies...</div>
            )}
            {!showFavorites && !hasMore && !loading && movies.length > 0 && (
              <div className="end-message">That's all the movies!</div>
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
