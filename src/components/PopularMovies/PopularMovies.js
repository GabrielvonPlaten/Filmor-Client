import React from 'react'
import './PopularMovies.sass';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const PopularMovies = ({ movieData }) => {
  return (
    <div className="popular-movie">
      <div
        style={{backgroundImage: "url(https://image.tmdb.org/t/p/original/" + movieData.backdrop_path + ")"}} 
        className="movie__backdrop">
      </div>
      <div className="popular-movie-header">
        <h2 className="popular-movie-header__title">{movieData.title}</h2>
        <span className="popular-movie-header__rating">
          <FontAwesomeIcon
            className="rating-star" 
            icon={faStar} />
          <span> {movieData.vote_average}</span>
        </span>
      </div>
      <div className="popular-movie__separation"></div>
      <p className="popular-movie__description">{movieData.overview}</p>
    </div>
  )
}

PopularMovies.propTypes = {
  movieData: PropTypes.object.isRequired,
}

export default PopularMovies
