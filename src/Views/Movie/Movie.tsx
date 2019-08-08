import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Movie.sass';
import faStar from '../../Styles/images/star.svg';
const API_KEY: any = process.env.API_KEY;

// Components
import LoadingPage from '../../Components/LoadingPage/LoadingPage';
import PeopleIcons from '../../Components/PeopleIcons/PeopleIcons';
import Poster from '../../Components/Poster/Poster';

// Movie API Service
import {
  getMovieData,
  getSimilarMovies,
  getMovieCast,
} from '../../apis/moviesService';

interface Props {
  match: any;
}

const Movie: React.FC<Props> = ({ match }) => {
  const id = match.params.id; // Movie ID taken from the url params
  const [movieData, setMovieData]: any[] = useState(null);
  const [movieGenres, setMovieGenres]: any[] = useState([]);
  const [productionCompanies, setProductionCompanies]: any[] = useState([]);
  const [movieCast, setMovieCast]: any[] = useState([]);
  const [similarMovies, setSimilarMovies]: any[] = useState([]);

  // Get movie details
  const getMovie = async () => {
    const movieResponse: any = await getMovieData(id);
    const castResponse: any = await getMovieCast(id);
    const similarMoviesResponse: any = await getSimilarMovies(id);

    setMovieData(movieResponse);
    setMovieGenres(movieResponse.genres);
    setProductionCompanies(movieResponse.production_companies);
    setMovieCast(castResponse.cast);
    setSimilarMovies(similarMoviesResponse.results);
  };

  useEffect(() => {
    getMovie();
  }, [match]);

  if (movieData !== null) {
    return (
      <div className='movie-container'>
        <div className='jumbotron-container'>
          <div
            className='jumbotron'
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
            }}
          >
            <div className='jumbotron-movie__gradient-shadow' />
          </div>
        </div>

        <div className='movie-overview'>
          <img
            className='movie-overview__image'
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
          />
          <div className='movie-overview-information'>
            <div className='movie-overview-header'>
              <div className='header-rating'>
                <h2 className='movie-overview-header__title'>
                  {movieData.title}
                  <span className='type-of-media'>(Movie)</span>
                </h2>
                <span className='movie-overview-header__rating'>
                  <img className='movie-overview-header__star' src={faStar} />
                  <span> {movieData.vote_average}</span>
                </span>
              </div>
              <ul className='movie-overview-header__genre-list'>
                {movieGenres.map((genre: any, index: number) => (
                  <li key={index} className='genre-list__item'>
                    <span>{genre.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Movie Overview */}
            <div className='movie-description'>
              <h3>Overview:</h3>
              <p>{movieData.overview}</p>

              <div className='movie-release'>
                <span className='movie-release__date'>
                  {movieData.release_date}
                </span>
              </div>

              {/* Runtime */}
              <div className='runtime-container'>
                <h3 className='runtime-container__title'>
                  Runtime:
                  {movieData.runtime ? (
                    <span className='runtime-container__total'>
                      <span>{movieData.runtime} </span>
                      Minutes
                    </span>
                  ) : (
                    <span className='runtime-container__total'>Unkown</span>
                  )}
                </h3>
              </div>

              {/* Revenue */}
              <div className='movie-revenue'>
                <h3 className='movie-revenue__title'>
                  Revenue:
                  <span className='movie-revenue__total'>
                    $<span> {movieData.revenue}</span>
                  </span>
                </h3>
              </div>
            </div>
            <div className='cast-container'>
              <h3>Cast: </h3>
              <div className='movie-cast'>
                {movieCast
                  .slice(0, 12)
                  .map((personData: any, index: number) => (
                    <Link key={index} to={`/people/${personData.id}`}>
                      <PeopleIcons personData={personData} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Similar Movies */}
          <div className='similar-media-container'>
            <h3>Similar Movies</h3>
            <div className='similar-media'>
              {similarMovies
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

export default Movie;
