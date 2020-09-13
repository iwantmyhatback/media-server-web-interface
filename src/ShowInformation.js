import React from 'react';
import Watch from './Watch.js';
import Trailer from './Trailer.js';
import Genres from './Genres.js';
import Year from './Year.js';
import Rating from './Rating.js';
import Description from './Description.js';
import Title from './Title.js';
import Seasons from './Seasons.js';

function ShowInformation(props) {
  return (
    <div className="information-container">
      <Title name={props.name} />
      <Description description={props.description} />
      <br />
      <Seasons seasons={props.seasons} />
      <Rating avgRating={props.avgRating} />
      <br />
      <Genres genres={props.genres} />
      <br />
    </div>
  );
}

export default ShowInformation;
