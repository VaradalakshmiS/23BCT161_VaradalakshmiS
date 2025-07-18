// server/index.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3001;

const dataPath = path.join(__dirname, 'movies_metadata.json');
const movies = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Enable CORS for dev (optional, if frontend on different port)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// List movies (lightweight)
app.get('/api/movies', (req, res) => {
  const list = movies.map(({ id, title, tagline, vote_average }) => ({
    id,
    title,
    tagline,
    vote_average,
  }));
  res.json(list);
});

// Get movie by ID
app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
