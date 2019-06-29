import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PeopleProfile.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Poster from '../Poster/Poster';

import noImage from '../../Styles/images/no-image.svg';

// Api Service
import apiService from '../../apis/service';


const PeopleProfile = (props) => {
  const [personData, setPersonData] = useState([]);
  const [personImages, setPersonImages] = useState([]);
  const [personMovieCredits, setPersonMovieCredits] = useState([]);

  useEffect(() => {
    apiService.getPersonProfile(props.match.params.id)
      .then(res => {
        setPersonData(res.data)
      })
      .catch(err => console.log(err));


    apiService.getPersonImages(props.match.params.id)
      .then(res => {
        setPersonImages(res.data.results.sort((a, b) => a.media.vote_count < b.media.vote_count));
      })
      .catch(err => console.log(err));

    apiService.getPersonMovieCredits(props.match.params.id)
      .then(res => {
        // Sort movie credits by the most popularity DESC order
        setPersonMovieCredits(res.data.cast.sort((a, b) => a.popularity < b.popularity));
      })
      .catch(err => console.log(err));
      
    }, [props]);

  const knownForDepartment = (personData) => {
    let { known_for_department, gender } = personData;
    let personProfessionClass = "person-department"

    switch(known_for_department, gender) {
      case "Acting" && 2:
        return <span className={personProfessionClass}>(Actor)</span>
        break;
      case "Acting" && 1:
        return <span className={personProfessionClass}>(Actress)</span>
        break;
      case "Directing" && 2 || 1:
        return <span className={personProfessionClass}>(Director)</span>
        break;
      default:
        return <span></span>
    }
  };

  return (
    <div className="person-container">
      <div className="jumbotron-container">
        { personImages && personImages.length > 0 ?
          <div 
            className="jumbotron" 
            style={{backgroundImage: "url(https://image.tmdb.org/t/p/original" + personImages[0].media.backdrop_path + ")"}}>
            <div className="jumbotron-movie__gradient-shadow"></div>
          </div>
        :
          <div 
            className="jumbotron" 
            style={ personMovieCredits[0] && {backgroundImage: "url(https://image.tmdb.org/t/p/original" + personMovieCredits[0].backdrop_path + ")"}}>
            <div className="jumbotron-movie__gradient-shadow"></div>
          </div>
      }
      </div>

      <div className="person-overview">
        <img
          className="person-overview__image" 
          src={"https://image.tmdb.org/t/p/original" + personData.profile_path} />
        <div className="person-overview-information">
          <div className="person-overview-header">
              <h2 className="person-overview-header__title">
                {personData.name}
                {knownForDepartment(personData)}
              </h2>
            <div className="birth-death-date">
              <h3>{personData.birthday} {personData.deathday !== null && " - " + personData.deathday}</h3>
            </div>
          </div>

          {/* Person Overview */}
          <div className="person-description">
            <h3>Overview:</h3>
            <p>{personData.biography}</p>
          </div>
        </div>

        <div className="similar-movies-container">
          <h3>Movie Credits</h3>
          <div className="similar-movies">
            {personMovieCredits.slice(0, 12).map((movieData, index) => (
              <Link
                className="similar-movies__item" 
                key={index} 
                to={"/movie/" + movieData.id}>
                <Poster 
                  mediaData={ movieData } 
                  mediaTitle={ movieData.title.slice(0, 50)}
                  mediaRating={movieData.vote_average} />
              </Link>
            ))}
          </div>
        </div>
    
      </div>
    </div>
  )
}

export default PeopleProfile
