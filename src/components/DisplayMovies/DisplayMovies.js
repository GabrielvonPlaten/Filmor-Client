import React from 'react'
import './DisplayMovies.sass';
import PropTypes from 'prop-types';

const DisplayMovies = ({ movieData }) => {

  return (
    <div className="popular-movie">
      <div
        style={{backgroundImage: "url(https://image.tmdb.org/t/p/original/" + movieData.poster_path + ")"}}
        className="movie__backdrop">
      </div>
    </div>
  )
}

DisplayMovies.propTypes = {
  movieData: PropTypes.object.isRequired,
}

export default DisplayMovies
