import React from 'react'
import './PeopleIcons.sass';

const PeopleIcons = ({ personData }) => {
  return (
    <div className="person-icon-container">
      <div>
        <img
          className="person-data__icon" 
          src={"https://image.tmdb.org/t/p/original" + personData.profile_path} />
      </div>
      <div>
        <h3 className="person-icon__name">{personData.name}</h3>
      </div>
    </div>
  )
}

export default PeopleIcons
