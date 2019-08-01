import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.sass';

const Navbar: React.FC = () => {
  return (
    <header className='navbar-container'>
      <NavLink
        to='/'
        activeClassName='is-active'
        className='navbar__item router-link'
        exact={true}
      >
        Home
      </NavLink>
      <NavLink
        to='/search'
        activeClassName='is-active'
        className='navbar__item router-link'
      >
        Search
      </NavLink>
    </header>
  );
};

export default Navbar;
