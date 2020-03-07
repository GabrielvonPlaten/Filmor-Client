import React, { useState, useRef } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './Navbar.sass';

const Navbar: React.FC = () => {
  const [searchData, setSearchData] = useState<string>('');

  const handleSearch = (e: any) => setSearchData(e.target.value);

  const Button = () => (
    <Route
      render={({ history }) => (
        <button
          className='btn--blue'
          onClick={() => {
            history.push(`/search/${searchData}`);
            setSearchData('');
          }}
        >
          Search
        </button>
      )}
    />
  );

  const selectField = (e: any) => e.target.select();

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
      <form className='navbar__item search-form'>
        <input
          className='search-form__input'
          onChange={(e) => handleSearch(e)}
          onFocus={(e) => selectField(e)}
          placeholder='Search...'
        />
        <Button />
      </form>
    </header>
  );
};

export default Navbar;
