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
    console.log(movie);
    await trailerLookup(movie, count);
    console.log(movie);
    await database.updateTrailer(movie);
    console.log(movie);
    wait(1000);
    if (count >= 10) {
      count = 1;
    }
  }
};

buildTrailers();
