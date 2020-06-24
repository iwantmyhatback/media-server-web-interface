import React, { useState, useEffect } from 'react';
import axios from 'axios';

let genreName = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

function Instance(props) {
  console.log(props);
  return (
    <React.Fragment>
      <div className="flex-item">
        <h3>{props.movie.name}</h3>
        <img src={props.movie.posterPath} alt="poster" width="500px" height="750px" />
        <div>Description: {props.movie.description}</div>
        <div>Year: {props.movie.year}</div>
        <div>Rating: {props.movie.avgRating} / 10</div>
        <div>
          Genres:{' '}
          {props.movie.genres
            ? props.movie.genres.map((id) => {
                return <div style={{ display: 'inline', margin: '8px' }}>{genreName[id]}</div>;
              })
            : []}
        </div>
        <div>Trailer?</div>
      </div>
    </React.Fragment>
  );
}

export default Instance;
