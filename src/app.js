import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import Navbar from './components/Navbar/Navbar'
import NowPlaying from './components/NowPlaying/NowPlaying.js';
import Movie from './components/Movie/Movie';
import SearchMovies from './components/SearchMovies/SearchMovies';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact={ true } path="/" component={ Home } />
          <Route exact={ true } path="/nowplaying" component={ NowPlaying } />
          <Route exact={ true } path="/movie/:id/:name" component={ Movie } />
          <Route exact={ true } path="/searchmovies/:query" component={ SearchMovies } />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
