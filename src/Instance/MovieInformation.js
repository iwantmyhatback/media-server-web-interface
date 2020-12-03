import React from 'react';
// import Watch from './Watch.js';
import Trailer from './InstanceInformation/Trailer.js';
import Genres from './InstanceInformation/Genres.js';
import Year from './InstanceInformation/Year.js';
import Rating from './InstanceInformation/Rating.js';
import Description from './InstanceInformation/Description.js';
import Title from './InstanceInformation/Title.js';
import Seen from './InstanceInformation/Seen.js';

function MovieInformation(props) {
  return (
    <div className="information-container">
      <Title name={props.name} />
      <Description description={props.description} />
      <br />
      <Rating avgRating={props.avgRating} />
      <Seen seen={props.seen} id={props.id} />
      <br />
      <Year year={props.year} />
      <br />
      <Genres genres={props.genres} />
      <br />
      <Trailer trailerPath={props.trailerPath} />
      {/* <Watch name={props.name} /> */}

      <br />
    </div>
  );
}

export default MovieInformation;
