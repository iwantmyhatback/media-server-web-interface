let styling = {};

styling.miniViewPortToTextSize = (portSize) => {
  if (portSize <= 650) {
    return '1.25vw';
  } else if (portSize <= 1300) {
    return '.95vw';
  } else {
    return '.6vw';
  }
};

styling.largeViewPortToTextSize = (portSize) => {
  if (portSize <= 650) {
    return '2vw';
  } else if (portSize <= 1300) {
    return '1.5vw';
  } else {
    return '.1vw';
  }
};

styling.miniViewPortToPosterSize = (portSize) => {
  let increment;
  if (portSize <= 1000) {
    increment = 7;
  } else {
    increment = 3.5;
  }
  return increment;
};

styling.largeViewPortToPosterSize = (portSize) => {
  let increment;
  if (portSize <= 1000) {
    increment = 20;
  } else {
    increment = 10;
  }
  return increment;
};

styling.viewPortToSymbolSize = (portSize) => {
  if (portSize <= 650) {
    return '2vw';
  } else if (portSize <= 1300) {
    return '1.5vw';
  } else {
    return '1vw';
  }
};

export default styling;
