import React from 'react';

function Search(props) {
  return (
    <div className="Search ">
      <input type="text" name="search" onChange={props.search} placeholder="Search Titles" />
    </div>
  );
}

export default Search;
