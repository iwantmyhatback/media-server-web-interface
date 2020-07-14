const database = require('./addData.js');
const trailerLookup = require('./trailerLookup.js');

function wait(ms) {
  var start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

let buildTrailers = async () => {
  let nullTrailers = await database.checkTrailers().then((returnedData) => {
    return returnedData.rows;
  });

  let count = 1;
  for (let movie of nullTrailers) {
    await trailerLookup(movie, count++);
    await database.updateTrailer(movie);
    wait(500);
    if (count >= 7) {
      count = 1;
    }
  }
};

buildTrailers();
