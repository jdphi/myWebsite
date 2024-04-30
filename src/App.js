import React from 'react';
import Home from './home';
import CatAPI from './catapi';
import WeatherAPI from './weatherapi';
import DogAPI from './dogapi';
import NewsAPI from './newsAPI';
import JokeAPI from './jokeapi';
import WebScraper from './webscaper';
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
              <Link to="/catapi/">Cat API</Link>
            </li>
            <li>
              <Link to="/dogapi/">Dog API</Link>
            </li>
            <li>
              <Link to="/news/">News API</Link>
            </li>
            <li>
              <Link to="/joke/">Joke API</Link>
            </li>
            <li>
              <Link to='/webscraper/'>Web Scraper</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} /> {/*Render Home component at the root path */}
          <Route path="/weather/" element={<WeatherAPI />} />
          <Route path="/dogapi/" element={<DogAPI />} />
          <Route path="/news/" element={<NewsAPI />} />
          <Route path="/catapi/" element={<CatAPI />} />
          <Route path="/joke/" element={<JokeAPI />}/>
          <Route path="/webscraper/" element={<WebScraper />}/>
        </Routes>
       </div>
    </Router>
  );
}

export default App; //exports component to index.js