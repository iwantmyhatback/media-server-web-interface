import React from 'react';
import styling from '../TranslationFunctions/viewportTextSize.js';
import 'bulma/css/bulma.css';

function PosterMini(props) {
  return (
    <div
      className="tile is-1 is-child poster-container-mini"
      style={{
        backgroundImage: `url(${props.posterPath})`,
        height: `${styling.miniViewPortToPosterSize(document.documentElement.clientWidth) * 3}vw`,
        width: `${styling.miniViewPortToPosterSize(document.documentElement.clientWidth) * 2}vw`,
      }}
    ></div>
  );
}

export default PosterMini;
