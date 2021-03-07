import React from 'react';
import 'bulma/css/bulma.css';

function Years(props) {
  return (
    <div className="Years select is-small">
      <select onChange={props.handleYearChange} defaultValue="Movie Year">
        <option hidden>Movie Year</option>
        {props.years.map((year) => {
          return (
            <option key={Math.random()} value={year.year}>
              {year.year}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Years;
