import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieListPage from './pages/MovieListPage';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
