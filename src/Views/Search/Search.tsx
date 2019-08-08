import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Search.sass';

import { searchMedia } from '../../apis/searchService';

// Components
import PeopleIcons from '../../Components/PeopleIcons/PeopleIcons';
import Poster from '../../Components/Poster/Poster';

const Search: React.FC = () => {
  const refQuery: any = useRef(null);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    let value: string = refQuery.current.value;
    let results: any = await searchMedia(value);
    await setSearchData(results.results);
    setIsLoading(false);
  };

  useEffect(() => {
    const elements: any = document.querySelectorAll('.media-anims');

    const observer = new IntersectionObserver(
      (entries: any) => {
        entries.forEach((entry: any) => {
          if (entry.intersectionRatio > 0) {
            entry.target.style.animation = `media_animation 0.7s forwards ease-in`;
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      },
    );

    elements.forEach((el: any) => {
      observer.observe(el);
    });
  }, [searchData]);

  // People Icons Component
  let displayPerson = searchData.map((res: any, index: number) => {
    if (res.media_type === 'person')
      return (
        <Link key={index} to={`/people/${res.id}`}>
          <div className='search-item media-anims'>
            <PeopleIcons personData={res} />
          </div>
        </Link>
      );
  });

  // Movie Poster Component
  let displayMovies = searchData.map((res: any, index: number) => {
    if (res.media_type === 'movie')
      return (
        <Link key={index} to={`/movie/${res.id}`}>
          <div className='search-item media-anims'>
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
        <Link key={index} to={`/tv/${res.id}`}>
          <div className='search-item media-anims'>
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
      {isLoading && <h1 className='loading-media'>Loading...</h1>}
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
