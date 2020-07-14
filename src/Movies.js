import React from 'react';
import Instance from './Instance.js';

function Movies(props) {
  let key = 0;
  return (
    <React.Fragment>
      <h2 className="sectionHead">Movies</h2>
      <div className="flex-container">
        {props.data.map((movie) => {
          return <Instance movie={movie} term={props.term} key={key++} />;
        })}
      </div>
    </React.Fragment>
  );
}

export default Movies;
