import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Util Component
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// Components
import Home from './Components/Home/Home';
import Movie from './components/Movie/Movie';
import Navbar from './components/Navbar/Navbar'
import TVShow from './components/TVShow/TVShow';
import NowPlaying from './components/NowPlaying/NowPlaying.js';
import SearchMovies from './components/SearchMovies/SearchMovies';
import PeopleProfile from './components/PeopleProfile/PeopleProfile';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route exact={ true } path="/" component={ Home } />
          <Route exact={ true } path="/tv/:id/:name" component={ Movie } />
          <Route exact={ true } path="/movie/:id" component={ Movie } />
          <Route exact={ true } path="/nowplaying" component={ NowPlaying } />
          <Route exact={ true } path="/people/:id/:name" component={ PeopleProfile } />
          <Route exact={ true } path="/searchmovies/:query" component={ SearchMovies } />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
