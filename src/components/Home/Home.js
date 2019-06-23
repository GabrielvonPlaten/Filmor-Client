import React from 'react';
import './Home.sass';

import BG_1 from '../../Styles/images/bg-1.jpg';

const Home = () => {

  return (
    <div className="landing-page">
      <div className="jumbotron-container">
        <div 
          className="jumbotron" 
          style={{backgroundImage: "url(" + BG_1 + ")"}}>
          <div className="jumbotron-header">
            <p className="jumbotron__rating">7.4</p>
            <h1 className="jumbotron__title">Toy Story</h1>
            <p className="jumbotron__release-date">2019-06-19</p>
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
