import React, { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './PeopleProfile.sass';

// Components
import LoadingPage from '../../Components/LoadingPage/LoadingPage';
import Poster from '../../Components/Poster/Poster';

// Person API Service
import {
  getPersonData,
  getPersonImages,
  getMovieCredits,
  getTVCredits,
} from '../../apis/personService';

// Interface
import { MatchIdInterface } from '../../types/MatchInterface';
import { PersonInterface } from '../../types/Person_Interface';

const PeopleProfile: React.FC<{ match: MatchIdInterface }> = ({ match }) => {
  const id = match.params.id; // Person ID taken from the url params
  const [personData, setPersonData]: any = useState(null);
  const [images, setImages]: any = useState([]);
  const [movieCredits, setMovieCredits]: any = useState([]);
  const [tvCredits, setTVCredits]: any = useState([]);

  // Get person data
  const getPerson = async () => {
    const personResponse = await getPersonData(id);
    const personImagesResponse = await getPersonImages(id);
    const movieCreditsResponse = await getMovieCredits(id);
    const tvCreditsResponse = await getTVCredits(id);

    await personImagesResponse.results.sort(
      (a: any, b: any) => a.media.popularity < b.media.vote_count,
    );
    await movieCreditsResponse.cast.sort(
      (a: any, b: any) => a.popularity < b.popularity,
    );
    await tvCreditsResponse.cast.sort(
      (a: any, b: any) => a.popularity < b.popularity,
    );

    setPersonData(personResponse);
    setImages(personImagesResponse);
    setMovieCredits(movieCreditsResponse.cast);
    setTVCredits(tvCreditsResponse.cast);
  };

  // Fetch APIs
  useEffect(() => {
    getPerson();
  }, [match]);

  const knownForDepartment = (personData: PersonInterface): ReactElement => {
    const { known_for_department, gender } = personData;

    const personProfessionClassName = 'person-department';

    switch (known_for_department as any) {
      case 'Acting' && gender === 2:
        return <span className={personProfessionClassName}>Actor</span>;
      case 'Acting' && gender === 1:
        return <span className={personProfessionClassName}>Actress</span>;
      case 'Directing':
        return <span className={personProfessionClassName}>Director</span>;
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

export default PeopleProfile;
