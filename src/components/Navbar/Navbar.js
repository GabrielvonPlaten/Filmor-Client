import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Navbar.sass';

const Navbar = (props) => {
  console.log(props);
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
        to="/search" 
        activeClassName="is-active"
        className="navbar__item router-link"
      >
        <FontAwesomeIcon icon = {faSearch} />
        Search
      </NavLink>
    </header>
  )
} 

export default Navbar
