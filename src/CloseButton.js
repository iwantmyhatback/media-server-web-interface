import React from 'react';

function CloseButton(props) {
  return (
    <button className="close" onClick={props.clicked}>
      𐄂
    </button>
  );
}

export default CloseButton;
