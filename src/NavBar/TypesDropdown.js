import React from 'react';

function Types(props) {
  return (
    <div className="Types">
      <label>
        Media Type: <br />
      </label>
      <select onChange={props.handleMediaTypeChange} value={props.selected}>
        <option value={'ALL'}>ALL</option>
        <option value={'Movies'}>Movies</option>
        <option value={'TV'}>TV</option>
      </select>
    </div>
  );
}

export default Types;
