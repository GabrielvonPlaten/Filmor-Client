import React, { useState, useEffect } from 'react'
import './Poster.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Poster = ({ mediaData, mediaTitle, mediaRating }) => {
  return (
    <div className="popular-movie">
      <img
        src={"https://image.tmdb.org/t/p/original" + mediaData.poster_path}
        className="movie__backdrop" />
      <h2 className="movie-poster__title">{mediaTitle}</h2>
      <div className="poster-rating">
        <FontAwesomeIcon icon={faStar} />
        <span className="poster-rating__rating">{mediaRating}</span>
      </div>
    </div>
  )
}

Poster.propTypes = {
  mediaData: PropTypes.object.isRequired,
  mediaTitle: PropTypes.string.isRequired,
  mediaRating: PropTypes.number.isRequired,
}

export default Poster
