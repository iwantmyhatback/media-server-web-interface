import React from 'react';
import 'bulma/css/bulma.css';

function Sort(props) {
  return (
    <div className="Sort select is-small">
      <select onChange={props.handleSortChange} defaultValue="Sort">
        <option hidden>Sort</option>
        <option key={Math.random()} value={'"year".DESC'}>
          Year Descending
        </option>
        <option key={Math.random()} value={'"year".ASC'}>
          Year Ascending
        </option>
        <option key={Math.random()} value={'"avgRating".DESC'}>
          Rating Descending
        </option>
        <option key={Math.random()} value={'"avgRating".ASC'}>
          Rating Ascending
        </option>
        <option key={Math.random()} value={'"name".DESC'}>
          Title Descending
        </option>
        <option key={Math.random()} value={'"name".ASC'}>
          Title Ascending
        </option>
      </select>
    </div>
  );
}

export default Sort;
