import React from 'react';
import Year from './InstanceInformation/Year.js';
import Rating from './InstanceInformation/Rating.js';
import TitleMini from './InstanceInformation/TitleMini.js';
import Seen from './InstanceInformation/Seen.js';
import 'bulma/css/bulma.css';

function MovieInformationMini(props) {
  return (
    <div className="information-container-mini tile is-11 is-child">
      <TitleMini name={props.name} />
      <Rating avgRating={props.avgRating} />
      <Seen seen={props.seen} id={props.id} />
      <Year year={props.year} />
    </div>
  );
}

export default MovieInformationMini;
