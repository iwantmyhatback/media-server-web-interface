import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Instance(props) {
  return (
    <React.Fragment>
      <div className="flex-item">
        <h3>{props.name}</h3>
        <p>poster</p>
        <p>desc</p>
        <p>year</p>
        <p>rating</p>
        <p>genre</p>
        <p>movie stars?</p>
        <p>trailer?</p>
      </div>
    </React.Fragment>
  );
}

export default Instance;
