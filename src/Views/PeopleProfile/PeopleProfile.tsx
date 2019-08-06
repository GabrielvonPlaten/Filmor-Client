import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { any } from 'prop-types';
import './PeopleProfile.sass';
const API_KEY: any = process.env.API_KEY;

// Components
import LoadingPage from '../../Components/LoadingPage/LoadingPage';
import Poster from '../../Components/Poster/Poster';

// useFetch Hook
import useFetch from '../../hooks/useFetch';

interface PeopleProp {
  match: any;
}

const PeopleProfile: React.FC<PeopleProp> = ({ match }) => {
  const id = match.params.id;
  let images: any = [];
  let movieCredits: any = [];
  let tvCredits: any = [];

  // Get person data
  const personData: any = useFetch({
    url: `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`,
  });

  // Images
  const getPersonImages: any = useFetch({
    url: `https://api.themoviedb.org/3/person/${id}/tagged_images?api_key=${API_KEY}&language=en-US`,
  });

  // Movie Credits
  const getMovieCredits: any = useFetch({
    url: `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`,
  });

  // TV Credits
  const getTVCredits: any = useFetch({
    url: `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${API_KEY}&language=en-US`,
  });

  // Sort Images and Credits by popylarity
  if (getPersonImages && getMovieCredits && getTVCredits) {
    images = getPersonImages.sort(
      (a: any, b: any) => a.media.popularity < b.media.vote_count,
    );

    movieCredits = getMovieCredits.cast.sort(
      (a: any, b: any) => a.popularity < b.popularity,
    );

    tvCredits = getTVCredits.cast.sort(
      (a: any, b: any) => a.popularity < b.popularity,
    );
  }

  const knownForDepartment = (personData: any) => {
    let { known_for_department, gender } = personData;
    let personProfessionClass = 'person-department';

    switch (known_for_department) {
      case 'Acting' && gender === 2:
        return <span className={personProfessionClass}>(Actor)</span>;
      case 'Acting' && gender === 1:
        return <span className={personProfessionClass}>(Actress)</span>;
      case 'Directing':
        return <span className={personProfessionClass}>(Director)</span>;
      default:
        return <span />;
    }
  };

  if (personData) {
    return (
      <div className='person-container'>
        <div className='jumbotron-container'>
          {images && images.length > 0 ? (
            <div
              className='jumbotron'
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${images[0].media.backdrop_path})`,
              }}
            >
              <div className='jumbotron-movie__gradient-shadow' />
            </div>
          ) : (
            <div
              className='jumbotron'
              style={
                movieCredits[0] && {
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movieCredits[0].backdrop_path})`,
                }
              }
            >
              <div className='jumbotron-movie__gradient-shadow' />
            </div>
          )}
        </div>

        <div className='person-overview'>
          <img
            className='person-overview__image'
            src={`https://image.tmdb.org/t/p/original${personData.profile_path}`}
          />
          <div className='person-overview-information'>
            <div className='person-overview-header'>
              <h2 className='person-overview-header__title'>
                {personData.name}
                {knownForDepartment(personData)}
              </h2>
              <div className='birth-death-date'>
                <h3>
                  {personData.birthday}{' '}
                  {personData.deathday !== null && ' - ' + personData.deathday}
                </h3>
              </div>
            </div>

            {/* Person Overview */}
            <div className='person-description'>
              <h3>Overview:</h3>
              <p>{personData.biography}</p>
            </div>
          </div>

          <div className='similar-media-container'>
            <h3>Movie Credits</h3>
            <div className='similar-media'>
              {movieCredits
                .slice(0, 14)
                .map((movieData: any, index: number) => (
                  <Link
                    className='similar-media__item'
                    key={index}
                    to={`/movie/${movieData.id}`}
                  >
                    <Poster
                      mediaData={movieData}
                      mediaTitle={movieData.title.slice(0, 50)}
                      mediaRating={movieData.vote_average}
                    />
                  </Link>
                ))}
            </div>
          </div>

          <div className='similar-media-container'>
            <h3>TV Show Credits</h3>
            <div className='similar-media'>
              {tvCredits.slice(0, 14).map((tvData: any, index: number) => (
                <Link
                  className='similar-media__item'
                  key={index}
                  to={`/tv/${tvData.id}`}
                >
                  <Poster
                    mediaData={tvData}
                    mediaTitle={tvData.name.slice(0, 50)}
                    mediaRating={tvData.vote_average}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingPage />;
  }
};

PeopleProfile.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PeopleProfile;
