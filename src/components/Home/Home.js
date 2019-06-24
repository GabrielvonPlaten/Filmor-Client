import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// Components
import DisplayMovies from '../DisplayMovies/DisplayMovies';

// Api Service
import apiService from '../../apis/service';

const Home = () => {
  const [jumbotronData, setJumbotronData] = useState([]);
  const [jumbotronGenres, setGenres] = useState([])
  const [popularData, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);

  // Fetch data from the API once the website is loaded
  useEffect(() => {
    apiService.getPopularMovies()
    .then(res => {
      // Retrieve all popular movies but the first
      setPopularMovies(res.data.results.slice(1, 7));
        // Send the ID of the first movie to fetch more details
        apiService.getMovieById(res.data.results[0].id)
          .then(res => {
            setJumbotronData(res.data) // Set jumbotron movie to state
            setGenres(res.data.genres) // Set genres to state
          })
      })
      .catch(err => console.log(err))

    apiService.getPopularTVShows()
      .then(res => {
        setPopularTVShows(res.data.results.slice(0, 6));
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div className="landing-page">
      <div className="jumbotron-container">
        <div 
          className="jumbotron" 
          style={{backgroundImage: "url(https://image.tmdb.org/t/p/original" + jumbotronData.backdrop_path + ")"}}>
          <div className="jumbotron-header">
            <p className="jumbotron__rating">
              <FontAwesomeIcon icon={faStar} />
              <span> {jumbotronData.vote_average}</span>
            </p>
            <h1 className="jumbotron__title">{jumbotronData.title}</h1>
            <ul className="genre-list">
              {jumbotronGenres.map((genre, index) => (
                <li
                  className="genre__item" 
                  key={index}>
                  {genre.name}
                </li>
              )) }
            </ul>
            <p className="jumbotron__release-date">{jumbotronData.release_date}</p>
            <Link
              to={"/movie/" + jumbotronData.id + "/" + jumbotronData.title} 
              className="btn btn--yellow jumbotron__btn">
              Read More
            </Link>
          </div>
          <div className="jumbotron__gradient-shadow"></div>
        </div>
      </div>

      {/* Popular Section */}
      <div class="homepage-showcase">
        <div className="section-separation">
          <h2 className="section-separation__title">
            <span class="title--yellow">Movies</span> - Popular
          </h2>
        </div>
        <div className="popular-movies-container">
          { popularData.map((movieData, index) => (
            <Link 
              key={index} 
              to={"/movie/" + movieData.id + "/" + movieData.title}>
              <DisplayMovies movieData={ movieData } />
            </Link>
          ))}
        </div>
        <div className="section-separation">
          <h2 className="section-separation__title">
            <span class="title--yellow">TV</span> - POPULAR
          </h2>
        </div>
        <div className="popular-movies-container">
          { popularTVShows.map((showData, index) => (
            <Link 
              key={index} 
              to={"/tv/" + showData.id + "/" + showData.name}>
              <DisplayMovies movieData={ showData } />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
