import React from 'react';
import Year from './Year.js';
import Rating from './Rating.js';
import TitleMini from './TitleMini.js';

function MovieInformationMini(props) {
  return (
    <div className="information-container">
      <TitleMini name={props.name} />
      <Rating avgRating={props.avgRating} />
      <br />
      <Year year={props.year} />
    </div>
  );
}

export default MovieInformationMini;
