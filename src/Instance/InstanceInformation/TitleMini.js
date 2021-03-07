import React from 'react';
import 'bulma/css/bulma.css';

function TitleMini(props) {
  return (
    <div className="title-container">
      <h1 className="title is-6">{props.name}</h1>
    </div>
  );
}

export default TitleMini;
