import React from 'react';

function Years(props) {
  return (
    <div className="Years">
      <label>
        Movie Year: <br />
      </label>
      <select onChange={props.handleYearChange} value={props.selected}>
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
