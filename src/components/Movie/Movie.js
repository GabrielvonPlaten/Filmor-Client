import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Movie.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

// Components
import PeopleIcons from '../PeopleIcons/PeopleIcons';
import Poster from '../Poster/Poster';

// Api Service
import apiService from '../../apis/service';


const Movie = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [productionCompanies, setPropdCompanies] = useState([]);

  useEffect(() => {
    apiService.getMovieById(props.match.params.id)
      .then(res => {
        setMovieData(res.data)
        setPropdCompanies(res.data.production_companies);
        setMovieGenres(res.data.genres)

        apiService.getSimilarMovies(res.data.id)
          .then(res => setSimilarMovies(res.data.results))

        apiService.getCastAndCrew(res.data.id)
          .then(res => setMovieCast(res.data.cast))
      })
      .catch(err => console.log(err));
      
    }, [props]);

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

          {/* Movie Overview */}
          <div className="movie-description">
            <h3>Overview:</h3>
            <p>{movieData.overview}</p>

            <div className="movie-release">
              <span className="movie-release__date">
                {movieData.release_date}
              </span>
            </div>

            {/* Runtime */}
            <div className="runtime-container">
              <h3 className="runtime-container__title">
                Runtime:
                {movieData.runtime ? 
                  <span className="runtime-container__total">
                    <span>{movieData.runtime} </span>
                    Minutes
                  </span> :
                  <span className="runtime-container__total">
                    Unkown
                  </span>}
              </h3>
            </div>

            {/* Revenue */}
            <div className="movie-revenue">
              <h3 className="movie-revenue__title">
                Revenue: 
                <span className="movie-revenue__total">
                  $<span> {movieData.revenue}</span>
                </span>
              </h3>
            </div> 

          </div>
          <div className="cast-container">
            <h3>Cast: </h3>
            <div className="movie-cast">
              { movieCast.slice(0, 10).map((personData, index) => (
                <Link 
                  key={index} 
                  to={"/people/" + personData.id}>
                  <PeopleIcons personData={ personData } />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        <div className="similar-movies-container">
          <h3>Similar Movies</h3>
          <div className="similar-movies">
            {similarMovies.slice(0, 12).map((movieData, index) => (
              <Link
                className="similar-movies__item" 
                key={index} 
                to={"/movie/" + movieData.id}>
                <Poster 
                  mediaData={ movieData } 
                  mediaTitle={ movieData.title.slice(0, 50)}
                  mediaRating={movieData.vote_average} />
              </Link>
            ))}
          </div>
        </div>

        {/* Production Companies */}
        <div className="production-companies">
          <h3>Production Companies</h3>
          <div className="production-companies-list">
            { productionCompanies.map((company, index) => (
              <div
                className="production-company__item" 
                key={index}>
                <h2 className="production-company__name">{company.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie
