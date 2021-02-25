const database = require('../server/database.js');
const dirPathFinder = require('../ETL/dirPathFinder.js');
const videoAndSubPathAdd = require('../ETL/videoAndSubPathAdd.js');
const tmdbLookup = require('./tmdbLookup.js');
const trailerLookup = require('./trailerLookup.js');

let updater = async () => {
  let currentDatabase = await database
    .getAllMovies()
    .then((returnedData) => {
      return returnedData.rows;
    })
    .catch((error) => {
      console.error('!!! There Was An Error Fetching Current Database --Line 14-- !!!');
    });

  let currentFiles = await dirPathFinder()
    .then((returnedData) => {
      // currentFiles = returnedData;
      console.log(returnedData);
      return returnedData;
    })
    .catch((error) => {
      console.log(error);
      console.error('!!! There Was An Error Fetching Movie File List --Line 23-- !!!');
    })
    .then((returnedData) => {
      for (let key in returnedData) {
        console.log(returnedData[key]);
        returnedData[key]['name'] = key.split('[')[0].trim();
        returnedData[key]['year'] = key.split('[')[1].slice(0, -1);
        console.log(returnedData[key]);
      }
      return returnedData;
    })
    .catch((error) => {
      console.log(error);
      console.error('!!! There Was An Error Splitting Name Information From File Name --Line 33-- !!!');
    });

  for (let movie of currentDatabase) {
    let year = movie.year === 0 ? '0000' : movie.year;
    if (currentFiles[movie.name + ' [' + year + ']']) {
      delete currentFiles[movie.name + ' [' + year + ']'];
    } else {
      console.log('*** Deleted File Detected In Database --- ' + movie.name + ' [' + year + ']' + '--- ***');
    }
  }

  let newAdditons = currentFiles;

  let count = 1;
  for (let key in newAdditons) {
    await videoAndSubPathAdd(newAdditons[key]);
    await tmdbLookup(newAdditons[key]);
    await trailerLookup(newAdditons[key], count++);
    await database.insertMovieRow(newAdditons[key]);
    if (count >= 7) {
      count = 1;
    }
  }
};

updater();
