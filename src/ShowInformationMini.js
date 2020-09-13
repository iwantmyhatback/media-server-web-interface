import React from 'react';
import Seasons from './Seasons.js';
import Rating from './Rating.js';
import TitleMini from './TitleMini.js';

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
