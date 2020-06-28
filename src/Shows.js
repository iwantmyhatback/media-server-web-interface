import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Instance from './Instance.js';

function Shows(props) {
  let key = 0;
  return (
    <React.Fragment>
      <h2>Shows</h2>
      <div className="flex-container">
        {props.data.map((show) => {
          // console.log(show);
          return <Instance show={show} key={key++} />;
        })}
      </div>
    </React.Fragment>
  );
}

export default Shows;
