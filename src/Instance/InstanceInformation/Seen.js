import React from 'react';
import axios from 'axios';
import config from '../../../config/config.js';
import styling from '../../TranslationFunctions/viewportTextSize.js';

function Seen(props) {
  function flipSeen() {
    axios
      .get(`/seen/${props.id}`)
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="seen-container">
      {props.seen ? (
        <div>
          <div className="seen-label">
            <b>{`Has ${config.owner} Seen It?: `}</b>
          </div>
          <div className="seen-indicator-on" onClick={flipSeen} style={{ fontSize: styling.viewPortToSymbolSize(document.documentElement.clientWidth) }}>
            ✔
          </div>
        </div>
      ) : (
        <div>
          <div className="seen-label">
            <b>{`Has ${config.owner} Seen It?: `}</b>
          </div>
          <div className="seen-indicator-off" onClick={flipSeen} style={{ fontSize: styling.viewPortToSymbolSize(document.documentElement.clientWidth) }}>
            ✘
          </div>
        </div>
      )}
    </div>
  );
}

export default Seen;
