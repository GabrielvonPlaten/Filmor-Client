import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './Home.sass';
import faStar from '../../Styles/images/star.svg';

// Components
import Poster from '../../Components/Poster/Poster';
import PeopleIcons from '../../Components/PeopleIcons/PeopleIcons';
import LoadingPage from '../../Components/LoadingPage/LoadingPage';

// APIs Services
import { getPopularMovies, getMovieData } from '../../apis/moviesService';
import { getPopularTVShow } from '../../apis/tvShowService';
import { getPopularPeople } from '../../apis/personService';

const Home: React.FC = () => {
  const [jumbotronData, setJumbotronData]: any = useState<null>(null);
  const [jumbotronGenres, setJumbotronGenres] = useState<undefined[]>([]);
  const [popularMovies, setPopularMovies] = useState<undefined[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<undefined[]>([]);
  const [popularPeople, setpopularPeople] = useState<undefined[]>([]);

  const fetchAPIs = async () => {
    const popularMoviesResponse = await getPopularMovies();
    const movieID: number = popularMoviesResponse.results[0].id;
    const movieJumbotronResponse = await getMovieData(movieID);
    const tvShowsResponse = await getPopularTVShow();
    const popularPeopleResponse = await getPopularPeople();

    setJumbotronData(movieJumbotronResponse);
    setJumbotronGenres(movieJumbotronResponse.genres);
    setPopularMovies(popularMoviesResponse.results.slice(1, 8));
    setPopularTVShows(tvShowsResponse.results.slice(0, 7));
    setpopularPeople(popularPeopleResponse.results);
  };

  // Fetch APIs
  useEffect(() => {
    fetchAPIs();
  }, []);

  useEffect(() => {
    console.log(popularMovies);
  }, [popularMovies]);

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

  if (jumbotronData !== null) {
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
                className='btn btn--yellow glow--yellow jumbotron__btn anim'
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
              Trending <span className='title--yellow'>Movies</span>
            </h2>
          </div>
          <div className='poster-list-container'>
            {popularMovies.map((movieData: any) => (
              <div key={movieData.id}>
                <Poster mediaData={movieData} mediaType='movie' />
              </div>
            ))}
          </div>

          {/* Popular TV shows Section */}
          <div className='section-separation'>
            <h2 className='section-separation__title'>
              Trendinng on <span className='title--yellow'>TV</span>
            </h2>
          </div>
          <div className='poster-list-container'>
            {popularTVShows.map((showData: any) => (
              <Link key={showData.id} to={`/tv/${showData.id}`}>
                <Poster mediaData={showData} mediaType='tvshow' />
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
            {popularPeople.map((personData: any, index: number) => (
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
