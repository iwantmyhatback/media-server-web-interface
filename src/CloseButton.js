import React from 'react';

function CloseButton(props) {
  return (
    <button className="close button" onClick={props.clicked}>
      𐄂
    </button>
  );
}

export default CloseButton;
