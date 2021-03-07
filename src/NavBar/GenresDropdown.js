import React from 'react';
import 'bulma/css/bulma.css';

function Genres(props) {
  return (
    <div className="Genres select is-small" defaultValue="Genres">
      <select onChange={props.handleGenreChange}>
        <option hidden>Genres</option>
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
