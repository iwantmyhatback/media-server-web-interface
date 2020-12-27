import React from 'react';
import styling from '../TranslationFunctions/viewportTextSize';

function Poster(props) {
  return (
    <div
      className="poster-container"
      style={{
        backgroundImage: `url(${props.posterPath})`,
        height: `${styling.largeViewPortToPosterSize(document.documentElement.clientWidth) * 3}vw`,
        width: `${styling.largeViewPortToPosterSize(document.documentElement.clientWidth) * 2}vw`,
      }}
    ></div>
  );
}

export default Poster;
