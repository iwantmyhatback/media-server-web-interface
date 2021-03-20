import React from 'react';

function Seen(props) {
  let key = 2000000000;
  return (
    <div className="Seen">
      <select onChange={props.handleSeenChange} defaultValue="Movie Seen">
        <option disabled>Movie Seen</option>
        <option key={key + 1} value={'{true,false}'}>
          ALL
        </option>
        <option key={key + 2} value={'{true}'}>
          Yes
        </option>
        <option key={key + 3} value={'{false}'}>
          No
        </option>
      </select>
    </div>
  );
}

export default Seen;
