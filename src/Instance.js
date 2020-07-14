import React from 'react';
import translateGenre from './translateGenre.js';
import starRating from './starRating';

function Instance(props) {
  if (props.movie) {
    if (props.movie.name.toLowerCase().includes(props.term.toLowerCase())) {
      return (
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
                {starRating({ rating: props.movie.avgRating * 0.5, width: 15, height: 15 })}
              </div>
              <br />
              <div className="genre-container">
                <b>Genres:</b>{' '}
                {props.movie.genres
                  ? props.movie.genres.map((id) => {
                      return (
                        <div key={Math.random()} style={{ display: 'inline', margin: '8px' }}>
                          {translateGenre(id)}
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
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  } else {
    if (props.show.name.toLowerCase().includes(props.term.toLowerCase())) {
      return (
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
                {starRating({ rating: props.show.avgRating * 0.5, width: 15, height: 15 })}
              </div>
              <br />
              <div className="genre-container">
                <b>Genres:</b>{' '}
                {props.show.genres
                  ? props.show.genres.map((id) => {
                      return (
                        <div key={Math.random()} style={{ display: 'inline', margin: '8px' }}>
                          {translateGenre(id)}
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
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default Instance;
