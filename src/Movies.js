import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Instance from './Instance.js';

function Movies(props) {
  let key = 0;
  return (
    <React.Fragment>
      <h2 style={{ color: 'white' }}>Movies</h2>
      <div className="flex-container">
        {props.data.map((movie) => {
          // console.log(movie);
          return <Instance movie={movie} key={key++} />;
        })}
      </div>
    </React.Fragment>
  );
}

export default Movies;
