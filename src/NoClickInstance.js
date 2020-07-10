import React, { useState, useEffect } from 'react';

function expandComponent(e) {
  e.preventDefault();
  console.log('The link was clicked.');
  clickExpand(!clicked);
}

function Instance(props) {
  return props.movie ? (
    <React.Fragment>
      <div className="flex-item" onClick={expandComponent}>
        <div className="small-poster-container" style={{ backgroundImage: `url(${props.movie.posterPath})` }}></div>
        <h2 className="title-container">{props.movie.name}</h2>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="flex-item">
        <div className="small-poster-container" style={{ backgroundImage: `url(${props.show.posterPath})` }}></div>
      </div>
    </React.Fragment>
  );
}

export default Instance;
