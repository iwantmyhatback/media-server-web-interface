import React from 'react';
import 'bulma/css/bulma.css';

function Seen(props) {
  return (
    <div className="Seen select is-small">
      <select onChange={props.handleSeenChange} defaultValue="Movie Seen">
        <option hidden>Movie Seen</option>
        <option value={'{true,false}'}>ALL</option>
        <option value={'{true}'}>Yes</option>
        <option value={'{false}'}>No</option>
      </select>
    </div>
  );
}

export default Seen;
