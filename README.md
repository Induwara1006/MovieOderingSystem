# Movie Ordering System

A React-based movie ordering website that displays movies using The Movie Database (TMDB) API. Users can browse movies, search for specific titles, view detailed information, add movies to favorites, and access download links.

## Features

- 🎬 **Movie Grid Display**: Browse popular movies in a responsive grid layout
- 🔍 **Search Functionality**: Search for movies by title
- ⭐ **Favorites System**: Add/remove movies to/from favorites with localStorage persistence
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎯 **Movie Details**: Click any movie to view detailed information including:
  - Movie overview/description
  - Release year
  - Rating
  - Popularity
  - Download link

## Setup Instructions

### 1. Get TMDB API Key

1. Go to [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to Settings → API
4. Request an API key (it's free for personal use)
5. Copy your API key

### 2. Configure the Application

Open `src/App.js` and add your TMDB API key:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual TMDB API key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Project Structure

```
movie-ordering-site/
├── src/
│   ├── components/
│   │   ├── MovieList.js          # Grid display of movies
│   │   ├── MovieList.css         # Styling for movie grid
│   │   ├── MovieDetail.js        # Movie detail modal
│   │   ├── MovieDetail.css       # Styling for detail modal
│   │   ├── SearchBar.js          # Search functionality
│   │   └── SearchBar.css         # Styling for search bar
│   ├── App.js                     # Main application component
│   ├── App.css                    # Main application styling
│   └── index.js                   # Application entry point
└── package.json
```

## How to Use

### Browse Movies
- The homepage displays popular movies by default
- Scroll through the grid to see all available movies

### Search for Movies
1. Enter a movie title in the search bar
2. Click the "Search" button or press Enter
3. Clear the search using the × button to return to popular movies

### View Movie Details
1. Click on any movie card
2. A modal will open showing:
   - Movie poster
   - Full title
   - Rating and release year
   - Complete description
   - Additional information
   - Download link

### Add to Favorites
- Click the star icon (☆) on any movie card to add it to favorites
- The star will turn gold (⭐) when favorited
- Click again to remove from favorites

### View Favorites
1. Click the "Favorites" button in the header
2. View all your favorited movies
3. Click the button again to return to the main movie list
4. Favorites are saved in your browser's localStorage

## Technologies Used

- **React**: Frontend framework
- **TMDB API**: Movie data and images
- **CSS3**: Styling and animations
- **localStorage**: Persistent favorites storage

## API Information

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api):
- Popular Movies Endpoint: `/movie/popular`
- Search Movies Endpoint: `/search/movie`
- Image Base URL: `https://image.tmdb.org/t/p/w500`

## Note on Download Links

The download links in this application are currently placeholder links for demonstration purposes. In a production environment, you would need to:
1. Integrate with a legitimate movie distribution service
2. Ensure proper licensing and copyright compliance
3. Implement secure download mechanisms
4. Add payment processing if required

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

This project is for educational purposes. Movie data and images are provided by TMDB and are subject to their terms of use.

