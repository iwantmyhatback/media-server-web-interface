import React from 'react';

function Genres(props) {
  return (
    <div className="Genres">
      <label>Movie Genre: </label>
      <select onChange={props.handleGenreChange} value={props.selected}>
        {props.genres.map((genre) => {
          return (
            <option key={Math.random()} value={genre}>
              {genre}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Genres;
