let styling = {};

styling.miniViewPortToTextSize = (portSize) => {
  if (portSize <= 1000) {
    return '1.25vw';
  } else {
    return '.6vw';
  }
};

styling.largeViewPortToTextSize = (portSize) => {
  if (portSize <= 1000) {
    return '2vw';
  } else {
    return '1vw';
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

export default styling;
