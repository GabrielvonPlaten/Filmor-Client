import React from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.sass';

const Navbar = () => {
  return (
    <header className="navbar-container">
      <NavLink 
        to="/" 
        activeClassName="is-active"
        className="navbar__item router-link"
        exact={ true }
      >Home</NavLink>
      <NavLink 
        to="/nowplaying" 
        activeClassName="is-active"
        className="navbar__item router-link"
      >Now Playing</NavLink>
      <NavLink 
        to="/searchmovies/moviename" 
        activeClassName="is-active"
        className="navbar__item router-link"
      >Query</NavLink>
      <NavLink 
        to="/movie/moviename" 
        activeClassName="is-active"
        className="navbar__item router-link"
      >Movie</NavLink>
    </header>
  )
} 

export default Navbar
