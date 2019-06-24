import React, { useState, useEffect } from 'react';
import './Movie.sass';
import apiService from '../../apis/service';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Movie = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);

  useEffect(() => {
    apiService.getMovieById(props.match.params.id)
      .then(res => {
        setMovieData(res.data)
        setMovieGenres(res.data.genres)
      })
      .catch(err => console.log(err));
  }, []);

  console.log(movieData);

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
          <div className="movie-overview-description">
                
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie
