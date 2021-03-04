import React from 'react';

function Sort(props) {
  return (
    <div className="Sort">
      <label>
        Sort: <br />
      </label>
      <select onChange={props.handleSortChange} value={props.selected}>
        <option value={'"year".DESC'}>Year Descending</option>
        <option value={'"year".ASC'}>Year Ascending</option>
        <option value={'"avgRating".DESC'}>Rating Descending</option>
        <option value={'"avgRating".ASC'}>Rating Ascending</option>
        <option value={'"name".DESC'}>Title Descending</option>
        <option value={'"name".ASC'}>Title Ascending</option>
      </select>
    </div>
  );
}

export default Sort;
