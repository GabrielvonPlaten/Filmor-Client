import React, { useState } from 'react'
import './Search.sass';

import apiService from '../../apis/service'; 

const Search = () => {
  const [searchData, setSearchData] = useState([]);

  const searchMedia = (e) => {
    e.preventDefault();
    let value = e.target.elements.query.value;
    apiService.getSearchResults(value)
      .then(res => setSearchData(res.data))
      .catch(err => console.log(err));

    console.log(searchData);
  }

  return (
    <div className="search-container">
      <h2 className="search-container__title">Search Any Media</h2>
      <form
        className="search-form"
        onSubmit={searchMedia}>
        <input 
          className="search-form__input"
          name="query" 
          placeholder="Search..." />
        <button className="btn btn--blue">Search</button>
      </form>
    </div>
  )
}

export default Search
