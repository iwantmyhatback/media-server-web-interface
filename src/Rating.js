import React from 'react';
import starRating from './starRating';

function Rating(props) {
  return (
    <div>
      <b>Rating: </b>
      {starRating({ rating: props.avgRating * 0.5, width: 15, height: 15 })}
    </div>
  );
}

export default Rating;
