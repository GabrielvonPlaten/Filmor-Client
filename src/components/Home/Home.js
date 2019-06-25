import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import _ from 'lodash';

// Components
import DisplayMovies from '../DisplayMovies/DisplayMovies';
import PeopleIcons from '../PeopleIcons/PeopleIcons';

// Api Service
import apiService from '../../apis/service';

const Home = () => {
  const [jumbotronData, setJumbotronData] = useState([]);
  const [jumbotronGenres, setGenres] = useState([])
  const [popularData, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [popularPeople, setPopularPeople] = useState([]);

  // Fetch data from the API once the website is loaded
  useEffect(() => {
    // Popular Movies
    apiService.getPopularMovies()
    .then(res => {
      // Retrieve all first 13 popular movies but the first
      setPopularMovies(res.data.results.slice(1, 13));
        // Send the ID of the first movie to fetch more details
        apiService.getMovieById(res.data.results[0].id)
          .then(res => {
            setJumbotronData(res.data) // Set jumbotron movie to state
            setGenres(res.data.genres) // Set genres to state
          })
      })
      .catch(err => console.log(err))


    // Popular TV Shows
    apiService.getPopularTVShows()
      .then(res => {
        setPopularTVShows(res.data.results.slice(0, 6));
      })
      .catch(err => console.log(err));


    // Get trending people
    apiService.getTrendingPeople()
      .then(res => setPopularPeople(res.data.results))
      .catch(err => console.log(err));
  }, [])

  let orderedMovies = _.sortBy(popularData, "popularity").reverse();

  return (
    <div className="landing-page">
      <div className="jumbotron-container">
        <div 
          className="jumbotron" 
          style={{backgroundImage: "url(https://image.tmdb.org/t/p/original" + jumbotronData.backdrop_path + ")"}}>
          <div className="jumbotron-header">
            <p className="jumbotron__rating">
              <FontAwesomeIcon icon={faStar} />
              <span> {jumbotronData.vote_average}</span>
            </p>
            <h1 className="jumbotron__title">{jumbotronData.title}</h1>
            <ul className="genre-list">
              {jumbotronGenres.map((genre, index) => (
                <li
                  className="genre__item" 
                  key={index}>
                  {genre.name}
                </li>
              )) }
            </ul>
            { jumbotronData.status !== "Released" ? 
              <p className="jumbotron__release-date">{jumbotronData.release_date}</p> : 
              <p className="jumbotron__release-date">{jumbotronData.status}!</p>}
            <Link
              to={"/movie/" + jumbotronData.id} 
              className="btn btn--yellow jumbotron__btn">
              Read More
            </Link>
          </div>
          <div className="jumbotron__gradient-shadow"></div>
        </div>
      </div>
      

      {/* Popular Movies Section */}
      <div className="homepage-showcase">
        <div className="section-separation">
          <h2 className="section-separation__title">
            <span className="title--yellow">Movies</span> - Popular
          </h2>
        </div>
        <div className="poster-list-container">
          { orderedMovies.map((movieData, index) => (
            <Link 
              key={index} 
              to={"/movie/" + movieData.id}>
              <DisplayMovies movieData={ movieData } />
              <FontAwesomeIcon icon={faStar} />
              <span className="poster-list__rating">{movieData.vote_average}</span>
            </Link>
          ))}
        </div>

        {/* Popular TV shows Section */}
        <div className="section-separation">
          <h2 className="section-separation__title">
            <span className="title--yellow">TV</span> - POPULAR
          </h2>
        </div>
        <div className="poster-list-container">
          { popularTVShows.map((showData, index) => (
            <Link 
              key={index} 
              to={"/tv/" + showData.id + "/" + showData.name}>
              <DisplayMovies movieData={ showData } />
            </Link>
          ))}
        </div>

         {/* Trending People */}
         <div className="section-separation">
          <h2 className="section-separation__title">
            <span className="title--yellow">PEOPLE</span> - POPULAR
          </h2>
        </div>
        <div className="trending-people-container">
          { popularPeople.map((personData, index) => (
            <Link 
              key={index} 
              to={"/people/" + personData.id + "/" + personData.name}>
              <PeopleIcons personData={ personData } />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
