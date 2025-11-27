import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'popular', name: 'Popular', endpoint: 'movie/popular' },
    { id: 'top_rated', name: 'Top Rated', endpoint: 'movie/top_rated' },
    { id: 'upcoming', name: 'Upcoming', endpoint: 'movie/upcoming' },
    { id: 'now_playing', name: 'Now Playing', endpoint: 'movie/now_playing' },
    { id: 28, name: 'Action', endpoint: 'discover/movie', genre: true },
    { id: 12, name: 'Adventure', endpoint: 'discover/movie', genre: true },
    { id: 16, name: 'Animation', endpoint: 'discover/movie', genre: true },
    { id: 35, name: 'Comedy', endpoint: 'discover/movie', genre: true },
    { id: 80, name: 'Crime', endpoint: 'discover/movie', genre: true },
    { id: 18, name: 'Drama', endpoint: 'discover/movie', genre: true },
    { id: 27, name: 'Horror', endpoint: 'discover/movie', genre: true },
    { id: 10749, name: 'Romance', endpoint: 'discover/movie', genre: true },
    { id: 878, name: 'Sci-Fi', endpoint: 'discover/movie', genre: true },
    { id: 53, name: 'Thriller', endpoint: 'discover/movie', genre: true },
  ];

  return (
    <div className="category-filter">
      <div className="category-scroll">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
