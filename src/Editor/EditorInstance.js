import React, { useState } from 'react';
import Poster from '../Instance/Poster.js';
import MovieInformation from '../Instance/MovieInformation.js';
import EditorSelectButton from './EditorSelectButton';
import styling from '../TranslationFunctions/viewportTextSize.js';
import axios from 'axios';

function EditorInstance(props) {
  function updateTitleInfo() {
    let movie = {
      name: props.original.name,
      year: props.original.year,
      description: props.movie.description,
      avgRating: props.movie.avgRating,
      genres: props.movie.genres,
      posterPath: props.movie.posterPath,
    };
    axios.put('/edit', { data: { newTitleInfo: movie } });
  }
  return (
    <React.Fragment>
      <div className="flex-item" style={{ fontSize: styling.largeViewPortToTextSize(document.documentElement.clientWidth) }}>
        <Poster posterPath={props.movie.posterPath} />
        <MovieInformation
          name={props.movie.name}
          description={props.movie.description}
          avgRating={props.movie.avgRating}
          year={props.movie.year}
          genres={props.movie.genres}
          trailerPath={props.movie.trailerPath}
          seen={props.movie.seen}
          id={props.movie.id}
        />
        <EditorSelectButton
          clicked={() => {
            updateTitleInfo();
            props.done(true);
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default EditorInstance;
