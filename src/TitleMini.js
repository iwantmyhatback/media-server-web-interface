import React from 'react';

function TitleMini(props) {
  return (
    <div className="title-container">
      <h1 className="title">{props.name}</h1>
    </div>
  );
}

export default TitleMini;
