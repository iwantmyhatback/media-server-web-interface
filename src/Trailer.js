import React from 'react';

function Trailer(props) {
  return (
    <a href={props.trailerPath} className="button" target="_blank">
      <b>Watch Trailer</b>
    </a>
  );
}

export default Trailer;
