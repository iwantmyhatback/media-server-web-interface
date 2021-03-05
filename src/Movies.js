import React from 'react';
import Instance from './Instance/Instance.js';

function Movies(props) {
  return (
    <React.Fragment>
      <h2 className="section-head">Movies</h2>
      <div className="flex-container">
        {props.data.map((movie) => {
          return <Instance id={movie.id} movie={movie} term={props.term} key={movie.id} showHide={props.showHide} />;
        })}
      </div>
    </React.Fragment>
  );
}

export default Movies;
