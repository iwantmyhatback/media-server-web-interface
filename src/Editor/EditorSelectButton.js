import React from 'react';

function EditorSelectButton(props) {
  return (
    <button className="editor-select" onClick={props.clicked}>
      ☑
    </button>
  );
}

export default EditorSelectButton;
