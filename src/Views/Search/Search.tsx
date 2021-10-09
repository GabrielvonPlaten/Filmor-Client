import React, { useState, useEffect, ReactElement, Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import './Search.sass';

import { searchMedia } from '../../apis/searchService';

// Components
import PeopleIcons from '../../Components/PeopleIcons/PeopleIcons';
import Poster from '../../Components/Poster/Poster';

// Interface
import { MatchTitleInterface } from '../../types/MatchInterface';

const Search: React.FC<{ match: MatchTitleInterface }> = ({ match }) => {
  const title: string = match.params.title;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any[]>([]);

  const handleSearch = async () => {
    setIsLoading(true);
    const results = await searchMedia(title);
    await setSearchData(results.results);

    if (searchData.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [match]);

  // People Icons Component
  const displayPerson = searchData.map(
    (res: any, index: number): ReactElement | null => {
      if (res.media_type === 'person')
        return (
          <Link key={index} to={`/people/${res.id}`}>
            <div className='search-item media-anims'>
              <PeopleIcons personData={res} />
            </div>
          </Link>
        );
    },
  );

  // Movie Poster Component
  const displayMovies = searchData.map(
    (res: any, index: number): ReactElement | null => {
      if (res.media_type === 'movie')
        return (
          <Link key={index} to={`/movie/${res.id}`}>
            <div className='search-item media-anims'>
              <Poster mediaData={res} mediaType='movie' />
            </div>
          </Link>
        );
    },
  );

  // TV-Show Poster Component
  const displayShows = searchData.map(
    (res: any, index: number): ReactElement | null => {
      if (res.media_type === 'tv')
        return (
          <Link key={index} to={`/tv/${res.id}`}>
            <div className='search-item media-anims'>
              <Poster mediaData={res} mediaType='tvshow' />
            </div>
          </Link>
        );
    },
  );

  console.log(typeof displayPerson[0]);

  return (
    <div className='search-container'>
      {isLoading && <h1 className='loading-media'>Loading...</h1>}
      <div className='search-results-container'>
        {typeof displayMovies[0] !== 'undefined' && (
          <Fragment>
            <h2 className='search-title'>Movies</h2>
            <div className='search-movies'>{displayMovies}</div>
          </Fragment>
        )}
      </div>
      <div className='search-results-container'>
        {typeof displayShows[0] !== 'undefined' && (
          <Fragment>
            <h2 className='search-title'>TV Shows</h2>
            <div className='search-shows'>{displayShows}</div>
          </Fragment>
        )}
      </div>
      <div className='search-results-container'>
        {typeof displayPerson[0] !== 'undefined' && (
          <Fragment>
            <h2 className='search-title'>People</h2>
            <div className='search-movies'>{displayPerson}</div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Search;
