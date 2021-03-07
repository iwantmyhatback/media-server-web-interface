import React from 'react';

function Types(props) {
  let key = 1000000000;
  return (
    <div className="Types">
      <select onChange={props.handleMediaTypeChange} defaultValue="Media Type">
        <option key={key + 1} disabled>
          Media Type
        </option>
        <option key={key + 2} value={'ALL'}>
          ALL
        </option>
        <option key={key + 3} value={'Movies'}>
          Movies
        </option>
        <option key={key + 4} value={'TV'}>
          TV
        </option>
      </select>
    </div>
  );
}

export default Types;
