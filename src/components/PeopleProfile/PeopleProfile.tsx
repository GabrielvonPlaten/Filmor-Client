import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PeopleProfile.sass";

import Poster from "../Poster/Poster";

// Api Service
import apiService from "../../apis/service";

interface PeopleProp {
  match: any;
}

const PeopleProfile: React.FC<PeopleProp> = ({ match }) => {
  const [personData, setPersonData]: any = useState([]);
  const [personImages, setPersonImages]: any = useState([]);
  const [personTVCredits, setPersonTVCredits]: any = useState([]);
  const [personMovieCredits, setPersonMovieCredits]: any = useState([]);

  useEffect(() => {
    apiService
      .getPersonProfile(match.params.id)
      .then(res => {
        setPersonData(res.data);
      })
      .catch(err => console.log(err));

    apiService
      .getPersonImages(match.params.id)
      .then(res => {
        setPersonImages(
          res.data.results.sort(
            (a: any, b: any) => a.media.vote_count < b.media.vote_count
          )
        );
      })
      .catch(err => console.log(err));

    apiService
      .getPersonMovieCredits(match.params.id)
      .then(res => {
        // Sort movie credits by the most popularity DESC order
        setPersonMovieCredits(
          res.data.cast.sort((a: any, b: any) => a.popularity < b.popularity)
        );
      })
      .catch(err => console.log(err));

    apiService
      .getPersonTVCredits(match.params.id)
      .then(res => {
        setPersonTVCredits(
          res.data.cast.sort((a: any, b: any) => a.popularity < b.popularity)
        );
      })
      .catch(err => console.log(err));
  }, [match]);

  const knownForDepartment = (personData: any) => {
    let { known_for_department, gender } = personData;
    let personProfessionClass = "person-department";

    switch (known_for_department) {
      case "Acting" && gender === 2:
        return <span className={personProfessionClass}>(Actor)</span>;
      case "Acting" && gender === 1:
        return <span className={personProfessionClass}>(Actress)</span>;
      case "Directing":
        return <span className={personProfessionClass}>(Director)</span>;
      default:
        return <span />;
    }
  };

  return (
    <div className="person-container">
      <div className="jumbotron-container">
        {personImages && personImages.length > 0 ? (
          <div
            className="jumbotron"
            style={{
              backgroundImage:
                "url(https://image.tmdb.org/t/p/original" +
                personImages[0].media.backdrop_path +
                ")"
            }}
          >
            <div className="jumbotron-movie__gradient-shadow" />
          </div>
        ) : (
          <div
            className="jumbotron"
            style={
              personMovieCredits[0] && {
                backgroundImage:
                  "url(https://image.tmdb.org/t/p/original" +
                  personMovieCredits[0].backdrop_path +
                  ")"
              }
            }
          >
            <div className="jumbotron-movie__gradient-shadow" />
          </div>
        )}
      </div>

      <div className="person-overview">
        <img
          className="person-overview__image"
          src={"https://image.tmdb.org/t/p/original" + personData.profile_path}
        />
        <div className="person-overview-information">
          <div className="person-overview-header">
            <h2 className="person-overview-header__title">
              {personData.name}
              {knownForDepartment(personData)}
            </h2>
            <div className="birth-death-date">
              <h3>
                {personData.birthday}{" "}
                {personData.deathday !== null && " - " + personData.deathday}
              </h3>
            </div>
          </div>

          {/* Person Overview */}
          <div className="person-description">
            <h3>Overview:</h3>
            <p>{personData.biography}</p>
          </div>
        </div>

        <div className="similar-media-container">
          <h3>Movie Credits</h3>
          <div className="similar-media">
            {personMovieCredits
              .slice(0, 14)
              .map((movieData: any, index: number) => (
                <Link
                  className="similar-media__item"
                  key={index}
                  to={"/movie/" + movieData.id}
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

        <div className="similar-media-container">
          <h3>TV Show Credits</h3>
          <div className="similar-media">
            {personTVCredits.slice(0, 14).map((tvData: any, index: number) => (
              <Link
                className="similar-media__item"
                key={index}
                to={"/tv/" + tvData.id}
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
};

export default PeopleProfile;
