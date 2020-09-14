import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Favorite(props) {
  function flipFavorite() {
    axios.get(`/favorite/${props.id}`);
  }

  console.log(props.favorite);

  return (
    <div className="favorite-container">
      {props.favorite ? (
        <div>
          <div className="favorite-label">
            <b>Has Tristan Seen It?: </b>
          </div>
          <div className="favorite-indicator-on" onClick={flipFavorite}>
            ✔
          </div>
        </div>
      ) : (
        <div>
          <div className="favorite-label">
            <b>Has Tristan Seen It?: </b>
          </div>
          <div className="favorite-indicator-off" onClick={flipFavorite}>
            ✘
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorite;
