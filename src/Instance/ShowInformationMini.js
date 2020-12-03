import React from 'react';
import Seasons from './InstanceInformation/Seasons.js';
import Rating from './InstanceInformation/Rating.js';
import TitleMini from './InstanceInformation/TitleMini.js';

function ShowInformationMini(props) {
  return (
    <div className="information-container">
      <TitleMini name={props.name} />
      <Rating avgRating={props.avgRating} />
      <Seasons seasons={props.seasons} />
    </div>
  );
}

export default ShowInformationMini;
