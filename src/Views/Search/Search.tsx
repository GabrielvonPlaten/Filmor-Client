import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Search.sass';

import { searchMedia } from '../../apis/search';

// Components
import PeopleIcons from '../../Components/PeopleIcons/PeopleIcons';
import Poster from '../../Components/Poster/Poster';

const Search: React.FC = () => {
  const [searchData, setSearchData]: any = useState([]);
  const refQuery: any = useRef(null);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    let value: string = refQuery.current.value;
    let results: any = await searchMedia(value);
    await setSearchData(results.data.results);
  };

  // People Icons Component
  let displayPerson = searchData.map((res: any, index: number) => {
    if (res.media_type === 'person')
      return (
        <Link key={index} to={'/people/' + res.id}>
          <div className='search-item'>
            <PeopleIcons personData={res} />
          </div>
        </Link>
      );
  });

  // Movie Poster Component
  let displayMovies = searchData.map((res: any, index: number) => {
    if (res.media_type === 'movie')
      return (
        <Link key={index} to={'/movie/' + res.id}>
          <div className='search-item'>
            <Poster
              mediaData={res}
              mediaTitle={res.title}
              mediaRating={res.vote_average}
            />
          </div>
        </Link>
      );
  });

  // TV-Show Poster Component
  let displayShows = searchData.map((res: any, index: number) => {
    if (res.media_type === 'tv')
      return (
        <Link key={index} to={'/tv/' + res.id}>
          <div className='search-item'>
            <Poster
              mediaData={res}
              mediaTitle={res.name}
              mediaRating={res.vote_average}
            />
          </div>
        </Link>
      );
  });

  return (
    <div className='search-container'>
      <h2 className='search-container__title'>Search Any Media</h2>
      <form className='search-form' onSubmit={(e) => handleSearch(e)}>
        <input
          autoFocus
          className='search-form__input'
          ref={refQuery}
          placeholder='Search...'
        />
        <button className='btn btn--blue'>Search</button>
      </form>
      <div className='search-results-container'>
        {displayPerson.length > 0 && <h2 className='search-title'>People</h2>}
        {displayPerson.length > 0 && (
          <div className='search-movies'>{displayPerson}</div>
        )}
      </div>
      <div className='search-results-container'>
        {displayMovies.length > 0 && <h2 className='search-title'>Movies</h2>}
        {displayMovies.length > 0 && (
          <div className='search-movies'>{displayMovies}</div>
        )}
      </div>
      <div className='search-results-container'>
        {displayShows.length > 0 && <h2 className='search-title'>TV Shows</h2>}
        {displayShows.length > 0 && (
          <div className='search-shows'>{displayShows}</div>
        )}
      </div>
    </div>
  );
};

export default Search;
