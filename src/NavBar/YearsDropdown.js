import React from 'react';

function Years(props) {
  let key = 3000000000;
  return (
    <div className="Years">
      <select onChange={props.handleYearChange} defaultValue="Movie Year">
        <option disabled>Movie Year</option>
        {props.years.map((year) => {
          return (
            <option key={key++} value={year.year}>
              {year.year}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Years;
