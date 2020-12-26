import React from 'react';
import starRating from '../../TranslationFunctions/translateStarRating';

function Rating(props) {
  return (
    <div className="rating">
      <b>Rating: </b>
      {starRating({ rating: props.avgRating * 0.5, width: '10vw', height: '10vw' })}
    </div>
  );
}

export default Rating;
