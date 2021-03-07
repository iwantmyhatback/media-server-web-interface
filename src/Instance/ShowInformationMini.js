import React from 'react';
import Seasons from './InstanceInformation/Seasons.js';
import Rating from './InstanceInformation/Rating.js';
import TitleMini from './InstanceInformation/TitleMini.js';
import 'bulma/css/bulma.css';

function ShowInformationMini(props) {
  return (
    <div className="information-container-mini tile is-11 is-child">
      <TitleMini name={props.name} />
      <Rating avgRating={props.avgRating} />
      <Seasons seasons={props.seasons} />
    </div>
  );
}

export default ShowInformationMini;
