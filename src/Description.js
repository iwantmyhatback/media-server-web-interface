import React from 'react';

function Description(props) {
  return (
    <div className="description-container">
      <b>Description:</b> {props.description}
    </div>
  );
}

export default Description;
