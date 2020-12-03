import React from 'react';

function PosterMini(props) {
  return <div className="poster-container-mini" style={{ backgroundImage: `url(${props.posterPath})` }}></div>;
}

export default PosterMini;
