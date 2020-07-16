import React, { useState } from 'react';

function Watch(props) {
  const [watch, setWatch] = useState(false);
  if (!watch) {
    return <button onClick={setWatch(!watch)}>Watch</button>;
  } else {
    return (
      <React.Fragment>
        <video key={props.file} id="videoPlayer" src={props.file} type="video/mp4" width="50%" muted="muted" controls></video>
      </React.Fragment>
    );
  }
}

export default Watch;
