import React from 'react';
import 'bulma/css/bulma.css';

function CloseButton(props) {
  return (
    <button className="button close" onClick={props.clicked}>
      𐄂
    </button>
  );
}

export default CloseButton;
