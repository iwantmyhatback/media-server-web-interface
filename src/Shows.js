import React from 'react';
import Instance from './Instance/Instance.js';

function Shows(props) {
  let key = 0;
  return (
    <React.Fragment>
      <h2 className="section-head">Shows</h2>
      <div className="flex-container">
        {props.data.map((show) => {
          return <Instance show={show} term={props.term} key={key++} />;
        })}
      </div>
    </React.Fragment>
  );
}

export default Shows;
