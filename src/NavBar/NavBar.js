import React from 'react';
import Years from './YearsDropdown.js';
import Types from './TypesDropdown.js';
import Search from './SearchBar.js';
import Genres from './GenresDropdown.js';
import Seen from './SeenDropdown';
import config from '../../config/config.js';

let NavBar = (props) => {
  return (
    <React.Fragment>
      <div className="NavBar">
        <a href="/" className="welcome">
          <h1>{`Welcome To ${config.owner}'s ${config.service}`}</h1>
        </a>
        <label>
          Movie Count: {props.movieLength} Show Count: {props.showLength}
          <br />
        </label>
        <br />

        <div className="filters">
          <Types handleMediaTypeChange={props.handleMediaTypeChange} selected={props.type} />
          {props.type === 'ALL' || props.type === 'Movies' ? (
            <React.Fragment>
              <Seen handleSeenChange={props.handleSeenChange} selected={props.selectedSeen} />
              <Years years={props.years} handleYearChange={props.handleYearChange} selected={props.selectedYear} />
            </React.Fragment>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <Genres genres={props.genres} handleGenreChange={props.handleGenreChange} selected={props.selectedGenre} />
          <Search search={props.search} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
