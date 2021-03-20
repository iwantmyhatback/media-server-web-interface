import React from 'react';

function Genres(props) {
  let key = 5000000000;
  return (
    <div className="Genres">
      <select onChange={props.handleGenreChange} defaultValue="Genres">
        <option disabled>Genres</option>
        {props.genres.map((genre) => {
          return (
            <option key={key++} value={genre}>
              {genre}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Genres;
