import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './Home.sass';
import faStar from '../../Styles/images/star.svg';

// Components
import Poster from '../Poster/Poster';
import PeopleIcons from '../PeopleIcons/PeopleIcons';

// Api Service
import apiService from '../../apis/service';

const Home: React.FC = () => {
  const [jumbotronData, setJumbotronData]: any = useState([]);
  const [jumbotronGenres, setGenres]: any[] = useState([]);
  const [popularData, setPopularMovies]: any[] = useState([]);
  const [popularTVShows, setPopularTVShows]: any[] = useState([]);
  const [popularPeople, setPopularPeople]: any[] = useState([]);
  const eleRef: any = useRef();

  // Fetch data from the API once the website is loaded
  useEffect(() => {
    // Popular Movies
    apiService
      .getPopularMovies()
      .then((res) => {
        // Retrieve all first 13 popular movies but the first
        setPopularMovies(res.data.results.slice(1, 13));
        // Send the ID of the first movie to fetch more details
        apiService.getMovieById(res.data.results[0].id).then((res) => {
          setJumbotronData(res.data); // Set jumbotron movie to state
          setGenres(res.data.genres); // Set genres to state
        });
      })
      .catch((err) => console.log(err));

    // Popular TV Shows
    apiService
      .getPopularTVShows()
      .then((res) => {
        setPopularTVShows(res.data.results.slice(0, 6));
      })
      .catch((err) => console.log(err));

    // Get trending people
    apiService
      .getTrendingPeople()
      .then((res) => setPopularPeople(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const orderedMovies = _.sortBy(popularData, 'popularity').reverse();

  // Animations on scroll
  useEffect(() => {
    const elements: any = document.querySelectorAll('.anim');

    const observer = new IntersectionObserver((entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.intersectionRatio > 0) {
          entry.target.style.animation = `anim_one 2s ${entry.target.dataset.delay} forwards ease-out`;
        } else {
          entry.target.style.animation = 'none';
        }
      });
    });

    // observer.observe(elements[0]);
    elements.forEach((el: any) => {
      observer.observe(el);
    });
  });

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
            <p className='jumbotron__rating anim' data-delay='0s'>
              <img src={faStar} />
              <span> {jumbotronData.vote_average}</span>
            </p>
            <h1 className='jumbotron__title anim' data-delay='0s'>
              {jumbotronData.title}
            </h1>
            <ul className='genre-list'>
              {jumbotronGenres.map((genre: any, index: number) => (
                <li className='genre__item anim' key={index} data-delay='0.5s'>
                  {genre.name}
                </li>
              ))}
            </ul>
            {jumbotronData.status !== 'Released' ? (
              <p className='jumbotron__release-date'>
                {jumbotronData.release_date}
              </p>
            ) : (
              <p className='jumbotron__release-date anim' data-delay='0.8s'>
                {jumbotronData.status}!
              </p>
            )}
            <Link
              to={`/movie/${jumbotronData.id}`}
              className='btn btn--yellow jumbotron__btn anim'
              data-delay='0.8s'
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
          {orderedMovies.map((movieData, index) => (
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
          {popularTVShows.map((showData: any, index: number) => (
            <Link key={index} to={`/tv/$showData.id}`}>
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
          {popularPeople.map((personData: any, index: number) => (
            <Link key={index} to={`/people/${personData.id}`}>
              <PeopleIcons personData={personData} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
