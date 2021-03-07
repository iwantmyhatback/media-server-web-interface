import React from 'react';
import 'bulma/css/bulma.css';

function Search(props) {
  return <input className="Search input is-small" type="text" name="search" onChange={props.search} placeholder="Search Phrase" />;
}

export default Search;
