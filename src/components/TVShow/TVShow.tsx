import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './TVShow.sass';
import faStar from '../../Styles/images/star.svg';

// Components
import LoadingPage from '../LoadingPage/LoadingPage';
import PeopleIcons from '../PeopleIcons/PeopleIcons';
import Poster from '../Poster/Poster';

// Api Service
import apiService from '../../apis/service';

interface Prop {
  props: any;
  match: any;
}

const TVShow: React.FC<Prop> = (props) => {
  const [tvShowData, setTVShowData]: any = useState(null);
  const [showGenres, setTVShowGenres]: any[] = useState([]);
  const [TVCast, setTVCast]: any[] = useState([]);
  const [similarShows, setSimilarShows]: any[] = useState([]);
  const [productionCompanies, setPropdCompanies]: any[] = useState([]);

  useEffect(() => {
    apiService
      .getTVShow(props.match.params.id)
      .then((res) => {
        setTVShowData(res.data);
        setPropdCompanies(res.data.production_companies);
        setTVShowGenres(res.data.genres);

        apiService
          .getSimilarShows(res.data.id)
          .then((res) => setSimilarShows(res.data.results));

        apiService
          .getTVShowCast(res.data.id)
          .then((res) => setTVCast(res.data.cast));
      })
      .catch((err) => console.log(err));
  }, [props]);

  if (tvShowData) {
    return (
      <div className='tv-show-container'>
        <div className='jumbotron-container'>
          <div
            className='jumbotron'
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShowData.backdrop_path})`,
            }}
          >
            <div className='jumbotron__gradient-shadow' />
          </div>
        </div>

        <div className='tv-show-overview'>
          <img
            className='tv-show-overview__image'
            src={`https://image.tmdb.org/t/p/original${tvShowData.poster_path}`}
          />
          <div className='tv-show-overview-information'>
            <div className='tv-show-overview-header'>
              <div className='header-rating'>
                <h2 className='tv-show-overview-header__title'>
                  {tvShowData.name}
                  <span className='type-of-media'>(Show)</span>
                </h2>
                <span className='tv-show-overview-header__rating'>
                  <img className='tv-show-overview-header__star' src={faStar} />
                  <span> {tvShowData.vote_average}</span>
                </span>
              </div>
              <ul className='tv-show-overview-header__genre-list'>
                {showGenres.map((genre: any, index: number) => (
                  <li key={index} className='genre-list__item'>
                    <span>{genre.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TV-Show Overview */}
            <div className='tv-show-description'>
              <h3>Overview:</h3>
              <p>{tvShowData.overview}</p>

              <div className='tv-show-release'>
                <span className='tv-show-release__date'>
                  {tvShowData.first_air_date}
                </span>
              </div>

              {/* Seasons */}
              <div className='tv-show-seasons'>
                <h3 className='tv-show-seasons__title'>
                  Seasons:
                  {tvShowData.number_of_seasons ? (
                    <span className='tv-show-seasons__total'>
                      <span>{tvShowData.number_of_seasons} </span>
                    </span>
                  ) : (
                    <span className='tv-show-seasons__total'>Unkown</span>
                  )}
                </h3>
              </div>

              {/* Episodes */}
              <div className='tv-show-episodes'>
                <h3 className='tv-show-episodes__title'>
                  Episodes:
                  <span className='tv-show-episodes__total'>
                    {tvShowData.number_of_episodes && (
                      <Fragment>
                        <span>{tvShowData.number_of_episodes}</span>
                        <span className='episode-length'>
                          ({tvShowData.episode_run_time[0]} min each)
                        </span>
                      </Fragment>
                    )}
                  </span>
                </h3>
              </div>
            </div>
            <div className='tv-show-cast-container'>
              <h3>Cast: </h3>
              <div className='tv-show-cast'>
                {TVCast.slice(0, 12).map((personData: any, index: number) => (
                  <Link key={index} to={`/people/${personData.id}`}>
                    <PeopleIcons personData={personData} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Similar Tv-Shows */}
          <div className='similar-media-container'>
            <h3>Similar Shows</h3>
            <div className='similar-media'>
              {similarShows
                .slice(0, 12)
                .map((tvShowData: any, index: number) => (
                  <Link
                    className='similar-media__item'
                    key={index}
                    to={`/tv/${tvShowData.id}`}
                  >
                    <Poster
                      mediaData={tvShowData}
                      mediaTitle={tvShowData.name.slice(0, 50)}
                      mediaRating={tvShowData.vote_average}
                    />
                  </Link>
                ))}
            </div>
          </div>

          {/* Production Companies */}
          {productionCompanies.length > 0 && (
            <div className='production-companies'>
              <h3>Production Companies</h3>
              <div className='production-companies-list'>
                {productionCompanies.map((company: any, index: number) => (
                  <div className='production-company__item' key={index}>
                    <h2 className='production-company__name'>{company.name}</h2>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <LoadingPage />;
  }
};

export default TVShow;
