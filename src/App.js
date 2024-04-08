import React from 'react';
import Home from './home';
import WeatherAPI from './weatherapi';
import DogAPI from './dogapi';
import NewsAPI from './newsAPI';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/weather/">Weather</Link>
            </li>
            <li>
              <Link to="/dogapi/">Dog API</Link>
            </li>
            <li>
              <Link to="/news/">News API</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} /> {/*Render Home component at the root path */}
          <Route path="/weather/" element={<WeatherAPI />} />
          <Route path="/dogapi/" element={<DogAPI />} />
          <Route path="/news/" element={<NewsAPI />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; //exports component to index.js