import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Movie.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

// Components
import PeopleIcons from '../PeopleIcons/PeopleIcons';

// Api Service
import apiService from '../../apis/service';


const Movie = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    apiService.getMovieById(props.match.params.id)
      .then(res => {
        setMovieData(res.data)
        setMovieGenres(res.data.genres)

        apiService.getCastAndCrew(res.data.id)
          .then(res => setMovieCast(res.data.cast))
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="movie-container">
      <div className="jumbotron-container">
        <div 
          className="jumbotron" 
          style={{backgroundImage: "url(https://image.tmdb.org/t/p/original" + movieData.backdrop_path + ")"}}>
          <div className="jumbotron-movie__gradient-shadow"></div>
        </div>
      </div>

      <div className="movie-overview">
        <img
          className="movie-overview__image" 
          src={"https://image.tmdb.org/t/p/original" + movieData.poster_path} />
        <div className="movie-overview-information">
          <div className="movie-overview-header">
            <div className="header-rating">
              <h2 className="movie-overview-header__title">{movieData.title}</h2>
              <span className="movie-overview-header__rating">
                <FontAwesomeIcon icon={faStar} />
                <span> {movieData.vote_average}</span>
              </span>
            </div>
            <ul className="movie-overview-header__genre-list">
              {movieGenres.map((genre, index) => (
                <li
                  key={index} 
                  className="genre-list__item">
                  <span>{genre.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="movie-description">
            <h3>Overview:</h3>
            <p>{movieData.overview}</p>
          </div>
          <div className="cast-container">
            <h3>Cast: </h3>
            <div className="movie-cast">
              { movieCast.slice(0, 10).map((personData, index) => (
                <Link 
                  key={index} 
                  to={"/people/" + personData.id + "/" + personData.name}>
                  <PeopleIcons personData={ personData } />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie
