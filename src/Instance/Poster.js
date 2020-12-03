import React from 'react';

function Poster(props) {
  return <div className="poster-container" style={{ backgroundImage: `url(${props.posterPath})` }}></div>;
}

export default Poster;
