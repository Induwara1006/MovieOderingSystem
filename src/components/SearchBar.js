import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, searchQuery }) => {
  const [input, setInput] = useState(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClear = () => {
    setInput('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for movies..."
        value={input}
        onChange={handleChange}
        className="search-input"
      />
      {input && (
        <button 
          type="button" 
          className="clear-btn"
          onClick={handleClear}
        >
          ×
        </button>
      )}
      <button type="submit" className="search-btn">
        🔍 Search
      </button>
    </form>
  );
};

export default SearchBar;
