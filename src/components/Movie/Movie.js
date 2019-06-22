import React, { useEffect } from 'react';
import './Movie.sass';

const Movie = (props) => {
  return (
    <div className="movie-container">
      <h1 className="movie__title">This is the Route for individual movies</h1>
      <p>Name: {props.match.params.name}</p>
    </div>
  )
}

export default Movie
