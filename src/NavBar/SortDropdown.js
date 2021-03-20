import React from 'react';

function Sort(props) {
  let key = 4000000000;
  return (
    <div className="Sort">
      <select onChange={props.handleSortChange} defaultValue="Movie Sort">
        <option disabled>Movie Sort</option>
        <option key={key + 1} value={'"year".DESC'}>
          Year Descending
        </option>
        <option key={key + 2} value={'"year".ASC'}>
          Year Ascending
        </option>
        <option key={key + 3} value={'"avgRating".DESC'}>
          Rating Descending
        </option>
        <option key={key + 4} value={'"avgRating".ASC'}>
          Rating Ascending
        </option>
        <option key={key + 5} value={'"name".DESC'}>
          Title Descending
        </option>
        <option key={key + 6} value={'"name".ASC'}>
          Title Ascending
        </option>
      </select>
    </div>
  );
}

export default Sort;
