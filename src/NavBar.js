import React from 'react';
import Years from './Years.js';
import Types from './Types.js';
import Search from './Search.js';

let NavBar = (props) => {
  return (
    <React.Fragment>
      <div className="NavBar">
        <h1>Welcome To Tristan's Fabulous Film Factory</h1>

        <div className="filters">
          <Types change={props.changeMediaType} selected={props.type} />
          {props.type === 'ALL' || props.type === 'Movies' ? (
            <Years years={props.years} change={props.getByYear} selected={props.selectedYear} />
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
