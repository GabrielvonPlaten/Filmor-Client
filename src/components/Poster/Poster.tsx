import React from 'react';
import './Poster.sass';
import faStar from '../../Styles/images/star.svg';
import PropTypes from 'prop-types';

import noImage from '../../Styles/images/no-image.svg';

// Types
import { PosterProps } from '../../types/PosterProps';

const Poster: React.FC<PosterProps> = ({
  mediaData,
  mediaTitle,
  mediaRating,
}) => {
  return (
    <div className='popular-movie'>
      <img
        src={
          mediaData.poster_path
            ? `https://image.tmdb.org/t/p/original${mediaData.poster_path}`
            : noImage
        }
        className='movie__backdrop'
      />
      <h2 className='movie-poster__title'>{mediaTitle}</h2>
      <div className='poster-rating'>
        <img className='poster-rating__star' src={faStar} />
        <span className='poster-rating__rating'>{mediaRating}</span>
      </div>
    </div>
  );
};

Poster.propTypes = {
  mediaData: PropTypes.object.isRequired,
  mediaTitle: PropTypes.string.isRequired,
  mediaRating: PropTypes.number.isRequired,
};

export default Poster;
