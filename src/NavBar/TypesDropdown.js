import React from 'react';
import 'bulma/css/bulma.css';

function Types(props) {
  return (
    <div className="Types select is-small" defaultValue="Media Type">
      <select onChange={props.handleMediaTypeChange}>
        <option hidden>Media Type</option>
        <option key={Math.random()} value={'ALL'}>
          ALL
        </option>
        <option key={Math.random()} value={'Movies'}>
          Movies
        </option>
        <option key={Math.random()} value={'TV'}>
          TV
        </option>
      </select>
    </div>
  );
}

export default Types;
