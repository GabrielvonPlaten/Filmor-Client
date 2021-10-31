import React from 'react';
import { Link } from 'react-router-dom';
import './Poster.sass';
import faStar from '../../Styles/images/star.svg';

import noImage from '../../Styles/images/no-image.svg';
import PlayButton from '../../Styles/images/play-button.svg';

// Types
type MediaType = 'movie' | 'tvshow';
import { PosterProps } from '../../types/PosterProps';

const Poster: React.FC<{ mediaData: any; mediaType: MediaType }> = ({
  mediaData,
  mediaType,
}) => {
  return (
    <div className='popular-movie'>
      <Link to={`/${mediaType}/${mediaData.id}`}>
        <img
          src={
            mediaData.poster_path
              ? `https://image.tmdb.org/t/p/original${mediaData.poster_path}`
              : noImage
          }
          className='movie__backdrop'
        />
      </Link>

      <div className='poster-header'>
        <Link to={`/${mediaType}/${mediaData.id}`}>
          {mediaType === 'movie' && mediaData.title && (
            <h2 className='poster-header__title'>
              {' '}
              {mediaData.title.slice(0, 50)}
            </h2>
          )}
          {mediaType === 'tvshow' && mediaData.name && (
            <h2 className='poster-header__title'>
              {mediaData.name.slice(0, 50)}
            </h2>
          )}
        </Link>

        <div className='poster-evenout'>
          <div>
            {mediaType === 'movie' && mediaData.release_date ? (
              <p className='poster-header__release_date'>
                {mediaData.release_date}
              </p>
            ) : (
              <p className='poster-header__release_date'>
                {mediaData.first_air_date}
              </p>
            )}
          </div>
          <div className='poster-rating'>
            <img className='poster-rating__star' src={faStar} />
            <span className='poster-rating__rating'>
              {mediaData.vote_average}
            </span>
          </div>
          <div className='poster-button-container'>
            <Link to={`/video/${mediaType}/${mediaData.id}`}>Trailer</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
