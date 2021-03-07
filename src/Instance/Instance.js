import React, { useState } from 'react';
import CloseButton from './CloseButton.js';
import Poster from './Poster.js';
import PosterMini from './PosterMini.js';
import MovieInformation from './MovieInformation.js';
import MovieInformationMini from './MovieInformationMini.js';
import ShowInformation from './ShowInformation.js';
import ShowInformationMini from './ShowInformationMini.js';
import styling from '../TranslationFunctions/viewportTextSize.js';
import 'bulma/css/bulma.css';

function Instance(props) {
  const [clicked, setClicked] = useState(false);

  //MOVIE///////////////////////////////////////////////////////////////////
  if (props.movie) {
    if (props.movie.name.toLowerCase().includes(props.term.toLowerCase())) {
      // CLICKED EXPANDED TILE ////////////////////////////////////////////////////
      return clicked ? (
        <React.Fragment>
          <div className="flex-item column is-full" style={{ fontSize: styling.largeViewPortToTextSize(document.documentElement.clientWidth) }}>
            <div className="columns">
              <Poster posterPath={props.movie.posterPath} />
              <MovieInformation
                name={props.movie.name}
                description={props.movie.description}
                avgRating={props.movie.avgRating}
                year={props.movie.year}
                genres={props.movie.genres}
                trailerPath={props.movie.trailerPath}
                seen={props.movie.seen}
                id={props.movie.id}
              />

              <button className="editor-button button" onClick={props.showHide} value={JSON.stringify({ name: props.movie.name, year: props.movie.year })}>
                Incorrect title information!
              </button>
              <CloseButton
                clicked={() => {
                  setClicked(!clicked);
                }}
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        // UNCLICKED MINI TILE /////////////////////////////////////////////////////
        <React.Fragment>
          <div
            className="flex-item-mini column is-3"
            onClick={() => {
              setClicked(!clicked);
            }}
            style={{ fontSize: styling.miniViewPortToTextSize(document.documentElement.clientWidth) }}
          >
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <PosterMini posterPath={props.movie.posterPath} />
                <MovieInformationMini
                  name={props.movie.name}
                  avgRating={props.movie.avgRating}
                  year={props.movie.year}
                  seen={props.movie.seen}
                  id={props.movie.id}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  } else {
    // SHOW ///////////////////////////////////////////////////////////////////
    if (props.show.name.toLowerCase().includes(props.term.toLowerCase())) {
      // CLICKED EXPANDED TILE ////////////////////////////////////////////////////
      return clicked ? (
        <React.Fragment>
          <div className="flex-item column is-full" style={{ fontSize: styling.largeViewPortToTextSize(document.documentElement.clientWidth) }}>
            <div className="columns">
              <Poster posterPath={props.show.posterPath} />

              <ShowInformation
                name={props.show.name}
                description={props.show.description}
                seasons={props.show.seasons}
                avgRating={props.show.avgRating}
                genres={props.show.genres}
              />
              <CloseButton
                clicked={() => {
                  setClicked(!clicked);
                }}
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        // UNCLICKED MINI TILE ////////////////////////////////////////////////////
        <React.Fragment>
          <div
            className="flex-item-mini column is-3"
            onClick={() => {
              setClicked(!clicked);
            }}
            style={{ fontSize: styling.miniViewPortToTextSize(document.documentElement.clientWidth) }}
          >
            <div className="block">
              <div className="tile is-parent">
                <PosterMini posterPath={props.show.posterPath} />
                <ShowInformationMini name={props.show.name} avgRating={props.show.avgRating} seasons={props.show.seasons} />
              </div>
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
