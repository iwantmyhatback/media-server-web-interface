import React, { useState, useEffect } from 'react';

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
  return props.movie ? (
    <React.Fragment>
      <div className="flex-item">
        <div className="poster-container" style={{ backgroundImage: `url(${props.movie.posterPath})` }}></div>
        <div className="information-container">
          <h2 className="title-container">{props.movie.name}</h2>
          <div className="description-container">
            <b>Description:</b> {props.movie.description}
          </div>
          <br />
          <div>
            <b>Year:</b> {props.movie.year}
          </div>
          <br />
          <div>
            <b>Rating: </b>
            {props.movie.avgRating} / 10
          </div>
          <br />
          <div className="genre-container">
            <b>Genres:</b>{' '}
            {props.movie.genres
              ? props.movie.genres.map((id) => {
                  return (
                    <div key={Math.random()} style={{ display: 'inline', margin: '8px' }}>
                      {genreName[id]}
                    </div>
                  );
                })
              : []}
          </div>
          <br />
          <a href={props.movie.trailerPath} className="button" target="_blank">
            <b>Watch Trailer</b>
          </a>
          <br />
        </div>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="flex-item">
        <div className="poster-container" style={{ backgroundImage: `url(${props.show.posterPath})` }}></div>
        <div className="information-container">
          <h2 className="title-container">{props.show.name}</h2>
          <div className="description-container">
            <b>Description:</b> {props.show.description}
          </div>
          <br />
          <div className="season-container" style={{ maxWidth: '25vw' }}>
            <b>Seasons:</b>{' '}
            {props.show.genres
              ? props.show.seasons.map((season) => {
                  return (
                    <div key={Math.random()} style={{ display: 'inline', margin: '8px' }}>
                      {season}
                    </div>
                  );
                })
              : []}
          </div>
          <br />
          <div>
            <b>Rating: </b>
            {props.show.avgRating} / 10
          </div>
          <br />
          <div className="genre-container">
            <b>Genres:</b>{' '}
            {props.show.genres
              ? props.show.genres.map((id) => {
                  return (
                    <div key={Math.random()} style={{ display: 'inline', margin: '8px' }}>
                      {genreName[id]}
                    </div>
                  );
                })
              : []}
          </div>
          <br />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Instance;
