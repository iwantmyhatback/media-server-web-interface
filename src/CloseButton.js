import React from 'react';

function CloseButton(props) {
  return (
    <button className="close button" onClick={props.clicked}>
      X
    </button>
  );
}

export default CloseButton;
