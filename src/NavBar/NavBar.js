import React from 'react';
import Years from './YearsDropdown.js';
import Types from './TypesDropdown.js';
import Search from './SearchBar.js';
import Genres from './GenresDropdown.js';
import Seen from './SeenDropdown';
import Sort from './SortDropdown';
import config from '../../config/config.js';
import 'bulma/css/bulma.css';

let NavBar = (props) => {
  return (
    <React.Fragment>
      <div className="nav-bar navbar is-spaced">
        <a href="/" className="welcome navbar-brand">
          <h1>{`${config.owner}'s ${config.service}`}</h1>
        </a>

        <div className="filters navbar-start">
          <Types handleMediaTypeChange={props.handleMediaTypeChange} selected={props.type} />
          {props.type === 'ALL' || props.type === 'Movies' ? (
            <React.Fragment>
              <Seen handleSeenChange={props.handleSeenChange} selected={props.selectedSeen} />
              <Years years={props.years} handleYearChange={props.handleYearChange} selected={props.selectedYear} />
              <Sort handleSortChange={props.handleSortChange} selected={props.selectedSort} />
            </React.Fragment>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <Genres genres={props.genres} handleGenreChange={props.handleGenreChange} selected={props.selectedGenre} />
          <Search search={props.search} />
        </div>

        <div className="media-count navbar-end">
          Movie Count: {props.movieLength} Show Count: {props.showLength}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
