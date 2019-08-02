import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.sass';

// Util Component
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';

// Components
import Home from './Views/Home/Home';
import Movie from './Views/Movie/Movie';
import Navbar from './Components/Navbar/Navbar';
import TVShow from './Views/TVShow/TVShow';
import Search from './Views/Search/Search';
import PeopleProfile from './Views/PeopleProfile/PeopleProfile';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app-body'>
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route exact={true} path='/movie/:id' component={Movie} />
          <Route exact={true} path='/tv/:id' component={TVShow} />
          <Route exact={true} path='/search' component={Search} />
          <Route exact={true} path='/people/:id' component={PeopleProfile} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
