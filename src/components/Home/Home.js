import React, { useState, useEffect } from 'react';
import './Home.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// Api Service
import apiService from '../../apis/service';

// Static Image
import BG_1 from '../../Styles/images/bg-1.jpg';

const Home = () => {

  const [jumbotronData, setJumbotronData] = useState([]);
  const [popularData, setPopularMovies] = useState([]);

  useEffect(() => {
    apiService.getPopularMovies()
      .then(res => {
        setPopularMovies(res.data.results.slice(1));
        setJumbotronData(res.data.results[0]);
      })
      .catch(err => console.log(err))
  }, [])

  console.log("Jumbotron: ", jumbotronData);
  console.log("Popular: ", popularData);

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
            <h1 className="jumbotron__title">{jumbotronData.original_title}</h1>
            <p className="jumbotron__release-date">{jumbotronData.release_date}</p>
            <button className="btn btn--yellow jumbotron__btn">Read More</button>
          </div>
          <div className="jumbotron__gradient-shadow"></div>
        </div>
      </div>
      <div className="section-separation">
        <h2 className="section__title">Popular</h2>
      </div>
    </div>
  )
}

export default Home
