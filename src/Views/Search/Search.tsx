import React, { useState, useRef, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import './Search.sass';

import { searchMedia } from '../../apis/searchService';

// Components
import PeopleIcons from '../../Components/PeopleIcons/PeopleIcons';
import Poster from '../../Components/Poster/Poster';

interface PropsInterface {
  match: any;
}

const Search: React.FC<PropsInterface> = ({ match }) => {
  const title: string = match.params.title;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any[]>([]);

  const handleSearch = async () => {
    setIsLoading(true);
    const results: any = await searchMedia(title);
    await setSearchData(results.results);

    if (searchData.length === 0) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleSearch();
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
  const displayPerson = searchData.map((res: any, index: number) => {
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
  const displayMovies = searchData.map((res: any, index: number) => {
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
  const displayShows = searchData.map((res: any, index: number) => {
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
