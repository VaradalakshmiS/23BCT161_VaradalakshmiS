import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieListPage.css';

export default function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(setMovies)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Movies List</h1>
      <div className="movie-grid">
        {movies.map(({ id, title, tagline, vote_average }) => (
          <div
            key={id}
            className="movie-card"
            onClick={() => navigate(`/movie/${id}`)}
            tabIndex={0}
            role="button"
            onKeyDown={e => e.key === 'Enter' && navigate(`/movie/${id}`)}
          >
            <h3>{title}</h3>
            <p><em>{tagline || 'No tagline available'}</em></p>
            <p>Rating: {vote_average}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
}
