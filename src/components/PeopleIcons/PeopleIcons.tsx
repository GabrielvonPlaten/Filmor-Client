import React from "react";
import "./PeopleIcons.sass";

// import noImage from "../../Styles/images/no-image.svg";
import noImage from "../../Styles/images/no-image.svg";

interface Person {
  personData: any;
  className?: any;
}

const PeopleIcons: React.FC<Person> = ({ personData }) => {
  return (
    <div className="person-icon-container">
      <div>
        <img
          className="person-data__icon"
          src={
            personData.profile_path
              ? "https://image.tmdb.org/t/p/original" + personData.profile_path
              : noImage
          }
        />
      </div>
      <div>
        <h3 className="person-icon__name">{personData.name}</h3>
      </div>
    </div>
  );
};

export default PeopleIcons;
