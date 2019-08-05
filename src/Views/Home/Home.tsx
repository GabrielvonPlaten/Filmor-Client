import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './Home.sass';
import faStar from '../../Styles/images/star.svg';
const API_KEY: any = process.env.API_KEY;

// Components
import Poster from '../../Components/Poster/Poster';
import PeopleIcons from '../../Components/PeopleIcons/PeopleIcons';
import LoadingPage from '../../Components/LoadingPage/LoadingPage';

// Fetch Hook
import useFetch from '../../hooks/useFetch';
import {
  POPULAR_MOVIES,
  POPULAR_TV_SHOWS,
  POPULAR_PEOPLE,
} from '../../apis/urlTypes';

const Home: React.FC = () => {
  let jumbotronGenres: string[] = [];

  let popularMovies: any = useFetch({
    url: POPULAR_MOVIES,
  });

  const jumbotronData: any = useFetch({
    url: `https://api.themoviedb.org/3/movie/${popularMovies &&
      popularMovies[0].id}?api_key=${API_KEY}`,
  });

  if (jumbotronData) {
    jumbotronGenres = jumbotronData.genres;
  }

  let popularTVShows: any = useFetch({
    url: POPULAR_TV_SHOWS,
  });

  const popularPeople: any = useFetch({
    url: POPULAR_PEOPLE,
  });

  // Animations on scroll
  useEffect(() => {
    const elements: any = document.querySelectorAll('.anim');

    const observer = new IntersectionObserver(
      (entries: any) => {
        entries.forEach((entry: any) => {
          if (entry.intersectionRatio > 0) {
            entry.target.style.animation = `anim_one 2.2s ${entry.target.dataset.delay} forwards ease-out`;
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
  });

  if (popularMovies && jumbotronData && jumbotronData.backdrop_path) {
    return (
      <div className='landing-page'>
        <div className='jumbotron-container'>
          <div
            className='jumbotron'
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${jumbotronData.backdrop_path})`,
            }}
          >
            <div className='jumbotron-header'>
              <p className='jumbotron__rating anim' data-delay='0'>
                <img src={faStar} />
                <span> {jumbotronData.vote_average}</span>
              </p>
              <h1 className='jumbotron__title anim' data-delay='0.3s'>
                {jumbotronData.title}
              </h1>
              <ul className='genre-list'>
                {jumbotronGenres.map((genre: any, index: number) => (
                  <li
                    className='genre__item anim'
                    key={index}
                    data-delay='0.68s'
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
              {jumbotronData.status !== 'Released' ? (
                <p className='jumbotron__release-date'>
                  {jumbotronData.release_date}
                </p>
              ) : (
                <p className='jumbotron__release-date anim' data-delay='0.68s'>
                  {jumbotronData.status}!
                </p>
              )}
              <Link
                to={`/movie/${jumbotronData.id}`}
                className='btn btn--yellow jumbotron__btn anim'
                data-delay='1.3s'
              >
                Read More
              </Link>
            </div>
            <div className='jumbotron__gradient-shadow' />
          </div>
        </div>

        {/* Popular Movies Section */}
        <div className='homepage-showcase'>
          <div className='section-separation'>
            <h2 className='section-separation__title'>
              <span className='title--yellow'>Movies</span> - Popular
            </h2>
          </div>
          <div className='poster-list-container'>
            {popularMovies.slice(1, 13).map((movieData: any, index: number) => (
              <Link key={index} to={`/movie/${movieData.id}`}>
                <Poster
                  mediaData={movieData}
                  mediaTitle={movieData.title.slice(0, 50)}
                  mediaRating={movieData.vote_average}
                />
              </Link>
            ))}
          </div>

          {/* Popular TV shows Section */}
          <div className='section-separation'>
            <h2 className='section-separation__title'>
              <span className='title--yellow'>TV</span> - POPULAR
            </h2>
          </div>
          <div className='poster-list-container'>
            {popularTVShows &&
              popularTVShows
                .slice(0, 12)
                .map((showData: any, index: number) => (
                  <Link key={index} to={`/tv/${showData.id}`}>
                    <Poster
                      mediaData={showData}
                      mediaTitle={showData.name.slice(0, 50)}
                      mediaRating={showData.vote_average}
                    />
                  </Link>
                ))}
          </div>

          {/* Trending People */}
          <div className='section-separation'>
            <h2 className='section-separation__title'>
              <span className='title--yellow'>PEOPLE</span> - POPULAR
            </h2>
          </div>
          <div className='trending-people-container'>
            {popularPeople &&
              popularPeople.map((personData: any, index: number) => (
                <Link key={index} to={`/people/${personData.id}`}>
                  <PeopleIcons personData={personData} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingPage />;
  }
};

export default Home;
