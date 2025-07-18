import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Movie not found');
        return res.json();
      })
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setMovie(null);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  const localizedDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : 'N/A';

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={() => navigate('/')}>← Back to list</button>
      <h1>{movie.title}</h1>
      <p><em>{movie.tagline || 'No tagline available'}</em></p>
      <p><strong>Release Date:</strong> {localizedDate}</p>
      <p><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} minutes` : 'N/A'}</p>
      <p><strong>Rating:</strong> {movie.vote_average || 'N/A'}/10</p>
      <p><strong>Overview:</strong> {movie.overview || 'N/A'}</p>
      {/* Display all other fields you want */}
      <pre style={{whiteSpace:'pre-wrap'}}>
        {JSON.stringify(movie, null, 2)}
      </pre>
    </div>
  );
}
