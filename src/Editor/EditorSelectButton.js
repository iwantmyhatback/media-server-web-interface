import React from 'react';

function EditorSelectButton(props) {
  return (
    <button className="close" onClick={props.clicked}>
      ☑
    </button>
  );
}

export default EditorSelectButton;
