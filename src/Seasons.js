import React from 'react';

function Seasons(props) {
  return (
    <div className="season-container">
      <b>Seasons:</b>{' '}
      {props.seasons
        ? props.seasons.map((season) => {
            return (
              <div key={Math.random()} className="season-item">
                {season}
              </div>
            );
          })
        : []}
    </div>
  );
}

export default Seasons;
