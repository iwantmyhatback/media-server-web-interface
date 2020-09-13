import React from 'react';
import Watch from './Watch.js';
import Trailer from './Trailer.js';
import Genres from './Genres.js';
import Year from './Year.js';
import Rating from './Rating.js';
import Description from './Description.js';
import Title from './Title.js';

function MovieInformation(props) {
  return (
    <div className="information-container">
      <Title name={props.name} />
      <Description description={props.description} />
      <br />
      <Rating avgRating={props.avgRating} />
      <br />
      <Year year={props.year} />
      <br />
      <Genres genres={props.genres} />
      <br />
      <Trailer trailerPath={props.trailerPath} />
      <Watch file={props.dirPath} />
      <br />
    </div>
  );
}

export default MovieInformation;
