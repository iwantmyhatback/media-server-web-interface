import React from 'react';

function Seen(props) {
  return (
    <div className="Seen">
      <label>Movie Seen: </label>
      <select onChange={props.handleSeenChange} value={props.selected}>
        <option value={'{true,false}'}>ALL</option>
        <option value={'{true}'}>Yes</option>
        <option value={'{false}'}>No</option>
      </select>
    </div>
  );
}

export default Seen;
