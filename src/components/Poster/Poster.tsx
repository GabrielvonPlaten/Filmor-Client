import React, { useEffect } from 'react';
import './Poster.sass';
import faStar from '../../Styles/images/star.svg';

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
      <div className='poster-rating'>
        <h2 className='movie-poster__title'>{mediaTitle}</h2>
        <img className='poster-rating__star' src={faStar} />
        <span className='poster-rating__rating'>{mediaRating}</span>
      </div>
    </div>
  );
};

export default Poster;
