import React from 'react';
import EditorInstance from './EditorInstance.js';

function Editor(props) {
  return (
    <React.Fragment>
      <h2 className="section-head">Select The Correct Title Infromation From Below And Click The Corrosponding Check Mark To Overwrite The Movie Data</h2>
      <div className="flex-container">
        {props.data.map((movie) => {
          return <EditorInstance id={movie.id} movie={movie} key={movie.id} done={props.done} />;
        })}
      </div>
    </React.Fragment>
  );
}

export default Editor;
