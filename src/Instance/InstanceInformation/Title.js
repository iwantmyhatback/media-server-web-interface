import React from 'react';

function Title(props) {
  return (
    <div className="title-container">
      <h2 className="title">{props.name}</h2>
    </div>
  );
}

export default Title;
