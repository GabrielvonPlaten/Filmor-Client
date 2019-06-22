import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About.jsx';
import Navbar from './Components/Navbar/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact={ true } path="/" component={ Home } />
          <Route exact={ true } path="/about" component={ About } />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
