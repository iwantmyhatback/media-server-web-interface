import React from 'react';

function Search(props) {
  return (
    <div className="Search ">
      <label>Search Titles: </label>
      <input type="text" name="search" onChange={props.search} />
    </div>
  );
}

export default Search;
