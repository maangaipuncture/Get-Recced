import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [movieName, setMovieName] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  React.useEffect(() => {
    fetchPopularMovies();
  }, []); // This empty array ensures the effect runs once when the component mounts

  const fetchPopularMovies = async () => {
    try {
      const apiKey = '8f2982399b3628b298cf52f22f3dbbbc'; // Replace with your TMDB API key
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
      );
      const popularMoviesData = response.data.results;

      // Map the relevant data and update state
      const popularMovies = popularMoviesData.map((movie) => ({
        title: movie.title,
        posterPath: movie.poster_path,
      }));

      setRecommendedMovies(popularMovies);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const fetchRecommendedMovies = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/recommend/?movie_name=${movieName}`);
      const recommendedMoviesData = response.data.recommended_movies;

      // Fetch movie poster data using TMDB API
      const apiKey = '8f2982399b3628b298cf52f22f3dbbbc'; // Replace with your TMDB API key
      const posterPromises = recommendedMoviesData.map(async (movieTitle) => {
        try {
          const tmdbResponse = await axios.get(
            `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=${apiKey}&query=${movieTitle}`
          );
          if (tmdbResponse.data.results && tmdbResponse.data.results.length > 0) {
            return {
              title: movieTitle,
              posterPath: tmdbResponse.data.results[0].poster_path,
            };
          }
        } catch (error) {
          console.error('Error fetching movie poster:', error);
        }
      });

      const posters = await Promise.all(posterPromises);

      setRecommendedMovies(posters);
    } catch (error) {
      console.error('Error fetching recommended movies:', error);
    }
  };

  return (
    <div className="App">
      <div class="header">
        <img src="/logo.png" alt="logo" class="logo" />
        <h1><i>GET RECCED!</i></h1>
      </div>
      <div class="bodyplace">
        <div class="search">
          <input
            type="text"
            placeholder="Enter a movie name"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
          />
          <button onClick={fetchRecommendedMovies}>Get Recommendations</button>
        </div>
        <div>
          <h2>Recommended Movies:</h2>
          <ul>
            <div className="recctitle">
              {recommendedMovies.map((movie, index) => (
                <li key={index}>
                  <p className="truncate">{truncateLongTitle(movie.title)}</p>
                  {movie.posterPath && (
                    <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(movie.title)}`}
                    target="_blank" // Open in a new tab
                    rel="noopener noreferrer" // Recommended for security
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w185${movie.posterPath}`}
                        alt={`${movie.title} Poster`}
                        className="movieposter"
                      />
                  </a>
                  )}
                </li>
              ))}
            </div>
          </ul>
          <div class="footer">
            <h3>Developed with ❤️ by Rohith Saravanan</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

// Function to truncate long movie titles
function truncateLongTitle(title) {
  const maxLength = 20; // You can adjust this value as needed
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...';
  }
  return title;
}

export default App;
