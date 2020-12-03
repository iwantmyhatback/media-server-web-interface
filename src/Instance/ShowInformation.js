import React from 'react';
// import Watch from './Watch.js';
import Trailer from './InstanceInformation/Trailer.js';
import Genres from './InstanceInformation/Genres.js';
import Year from './InstanceInformation/Year.js';
import Rating from './InstanceInformation/Rating.js';
import Description from './InstanceInformation/Description.js';
import Title from './InstanceInformation/Title.js';
import Seasons from './InstanceInformation/Seasons.js';

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
