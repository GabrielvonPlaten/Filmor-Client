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
        to="/about" 
        activeClassName="is-active"
        className="navbar__item router-link"
      >About</NavLink>
    </header>
  )
} 

export default Navbar
