import React, { useState } from 'react';
import CloseButton from './CloseButton.js';
import Poster from './Poster.js';
import PosterMini from './PosterMini.js';
import MovieInformation from './MovieInformation.js';
import MovieInformationMini from './MovieInformationMini.js';
import ShowInformation from './ShowInformation.js';
import ShowInformationMini from './ShowInformationMini.js';

function Instance(props) {
  const [clicked, setClicked] = useState(false);

  //MOVIE///////////////////////////////////////////////////////////////////
  if (props.movie) {
    if (props.movie.name.toLowerCase().includes(props.term.toLowerCase())) {
      // CLICKED EXPANDED TILE ////////////////////////////////////////////////////
      return clicked ? (
        <React.Fragment>
          <div className="flex-item">
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
            <CloseButton
              clicked={() => {
                setClicked(!clicked);
              }}
            />
          </div>
        </React.Fragment>
      ) : (
        // UNCLICKED MINI TILE /////////////////////////////////////////////////////
        <React.Fragment>
          <div
            className="flex-item-mini"
            onClick={() => {
              setClicked(!clicked);
            }}
          >
            <PosterMini posterPath={props.movie.posterPath} />
            <MovieInformationMini
              name={props.movie.name}
              avgRating={props.movie.avgRating}
              year={props.movie.year}
              seen={props.movie.seen}
              id={props.movie.id}
            />
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
          <div className="flex-item">
            <Poster posterPath={props.show.posterPath} />
            <CloseButton
              clicked={() => {
                setClicked(!clicked);
              }}
            />
            <ShowInformation
              name={props.show.name}
              description={props.show.description}
              seasons={props.show.seasons}
              avgRating={props.show.avgRating}
              genres={props.show.genres}
            />
          </div>
        </React.Fragment>
      ) : (
        // UNCLICKED MINI TILE ////////////////////////////////////////////////////
        <React.Fragment>
          <div
            className="flex-item-mini"
            onClick={() => {
              setClicked(!clicked);
            }}
          >
            <PosterMini posterPath={props.show.posterPath} />
            <ShowInformationMini name={props.show.name} avgRating={props.show.avgRating} seasons={props.show.seasons} />
          </div>
        </React.Fragment>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default Instance;
