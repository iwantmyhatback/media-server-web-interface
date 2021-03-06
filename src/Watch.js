import React, { useState, useEffect } from 'react';

function Watch(props) {
  const [watch, setWatch] = useState(false);

  useEffect(() => {
    setWatch(false);
  }, []);

  if (watch === false) {
    return (
      <button
        className="button"
        onClick={() => {
          setWatch(!watch);
        }}
      >
        Watch
      </button>
    );
  } else {
    return (
      <React.Fragment>
        <video key={props.name} id="videoPlayer" src={`/watch/${props.name}`} type="video/mp4" width="50%" muted="muted" controls></video>
      </React.Fragment>
    );
  }
}

export default Watch;
