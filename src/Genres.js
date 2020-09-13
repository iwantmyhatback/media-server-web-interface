import React from 'react';
import { translateGenre } from './translateGenre.js';

function Genres(props) {
  return (
    <div className="genre-container">
      <b>Genres:</b>{' '}
      {props.genres
        ? props.genres.map((id) => {
            return (
              <div key={Math.random()} style={{ display: 'inline', margin: '8px' }}>
                {translateGenre(id)}
              </div>
            );
          })
        : []}
    </div>
  );
}

export default Genres;
