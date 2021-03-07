import React from 'react';
// import Watch from './Watch.js';
import Genres from './InstanceInformation/Genres.js';
import Rating from './InstanceInformation/Rating.js';
import Description from './InstanceInformation/Description.js';
import Title from './InstanceInformation/Title.js';
import Seasons from './InstanceInformation/Seasons.js';
import 'bulma/css/bulma.css';

function ShowInformation(props) {
  return (
    <div className="information-container column">
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
