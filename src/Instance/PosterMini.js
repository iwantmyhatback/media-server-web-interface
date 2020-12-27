import React from 'react';
import styling from '../TranslationFunctions/viewportTextSize.js';

function PosterMini(props) {
  return (
    <div
      className="poster-container-mini"
      style={{
        backgroundImage: `url(${props.posterPath})`,
        height: `${styling.miniViewPortToPosterSize(document.documentElement.clientWidth) * 3}vw`,
        width: `${styling.miniViewPortToPosterSize(document.documentElement.clientWidth) * 2}vw`,
      }}
    ></div>
  );
}

export default PosterMini;
