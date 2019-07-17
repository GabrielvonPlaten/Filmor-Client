import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Util Component
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

// Components
import Home from "./Components/Home/Home";
import Movie from "./Components/Movie/Movie";
import Navbar from "./Components/Navbar/Navbar";
import TVShow from "./Components/TVShow/TVShow";
import Search from "./Components/Search/Search";
import PeopleProfile from "./Components/PeopleProfile/PeopleProfile";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/movie/:id" component={Movie} />
          <Route exact={true} path="/tv/:id" component={TVShow} />
          <Route exact={true} path="/search" component={Search} />
          <Route exact={true} path="/people/:id" component={PeopleProfile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
