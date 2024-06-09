import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';
import Home from './pages/Home';
import Header from './components/common/Header';

const App: React.FC = () => {

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<p>Path not resolved</p>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
