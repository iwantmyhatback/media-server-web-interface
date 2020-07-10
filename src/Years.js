import React, { useState, useEffect, useForm } from 'react';

function Years(props) {
  return (
    <form>
      <label>Movie Year: </label>
      <select onChange={props.change} value={props.selected}>
        {props.years.map((year) => {
          return (
            <option key={Math.random()} value={year.year}>
              {year.year}
            </option>
          );
        })}
      </select>
    </form>
  );
}

export default Years;
