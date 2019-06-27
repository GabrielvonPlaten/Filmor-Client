import React, { useState, useEffect } from 'react'
import './Search.sass';

import apiService from '../../apis/service'; 

// Components
import PeopleIcons from '../PeopleIcons/PeopleIcons';
import Poster from '../Poster/Poster';

const Search = () => {
  const [searchData, setSearchData] = useState([]);

  const searchMedia = (e) => {
    e.preventDefault();
    let value = e.target.elements.query.value;
    apiService.getSearchResults(value)
      .then(res => {
        setSearchData(res.data.results)
      })
      .catch(err => console.log(err));
      
      console.log(searchData);
  };

  let displayPerson = searchData.map((res, index) => {
    if (res.media_type === "person")
    return (
      <PeopleIcons
        className="search-item"
        key={index} 
        personData={ res } />
    )
  });

  let displayMovies = searchData.map((res, index) => {
    if (res.media_type === "movie")
    return (
      <Poster
        className="search-item"
        key={index} 
        mediaData={ res }
        mediaTitle={ res.title }
        mediaRating={ res.vote_average } />
    )
  });
  

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
      <div className="search-results-container">
        { displayPerson.length > 0 && <h2 className="search-title">People</h2> }
        { displayPerson.length > 0 &&
          <div className="search-movies">
            { displayPerson }
          </div>
        }
      </div>
      <div className="search-results-container">
        { displayMovies.length > 0 && <h2 className="search-title">Movies</h2> }
        { displayMovies.length > 0 &&
          <div className="search-movies">
            { displayMovies }
          </div>
        }
      </div>
    </div>
  )
}

export default Search
