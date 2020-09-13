import React from 'react';
import Years from './YearsDropdown.js';
import Types from './TypesDropdown.js';
import Search from './SearchBar.js';
import Genres from './GenresDropdown.js';

let NavBar = (props) => {
  return (
    <React.Fragment>
      <div className="NavBar">
        <h1>Welcome To Tristan's Fabulous Film Factory</h1>
        <label>
          Movie Count: {props.movieLength} Show Count: {props.showLength}
          <br />
        </label>
        <br />

        <div className="filters">
          <Types change={props.changeMediaType} selected={props.type} />
          {props.type === 'ALL' || props.type === 'Movies' ? (
            <Years years={props.years} change={props.getByYear} selected={props.selectedYear} />
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {props.type === 'ALL' || props.type === 'Movies' ? (
            <Genres genres={props.genres} change={props.getByGenre} selected={props.selectedGenre} />
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <Search search={props.search} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
