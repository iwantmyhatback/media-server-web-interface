const config = require('../config/config.js');
const database = require('./addData.js');
const dirPathFinder = require('../ETL/dirPathFinder.js');
const videoAndSubPathAdd = require('../ETL/videoAndSubPathAdd.js');
const tmdbLookup = require('./tmdbLookup.js');
const trailerLookup = require('./trailerLookup.js');
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const promreaddir = util.promisify(fs.readdir);

let updater = async () => {
  // let currentDatabase = {};
  // let currentFiles = {};

  let currentDatabase = await database
    .getAllMovies()
    .then((returnedData) => {
      // currentDatabase = returnedData.rows;
      // console.log(returnedData.rows);
      return returnedData.rows;
    })
    .catch((error) => {
      console.error('!!! There Was An Error Fetching Current Database --Line 22-- !!!');
    });

  let currentFiles = await dirPathFinder()
    .then((returnedData) => {
      // currentFiles = returnedData;
      return returnedData;
    })
    .catch((error) => {
      console.error('!!! There Was An Error Fetching Movie File List --Line 32-- !!!');
    })
    .then((returnedData) => {
      for (let key in returnedData) {
        returnedData[key]['name'] = key.split('[')[0].trim();
        returnedData[key]['year'] = key.split('[')[1].slice(0, -1);
      }
      return returnedData;
    })
    .catch((error) => {
      console.error('!!! There Was An Error Splitting Name Information From File Name --Line 40-- !!!');
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

  let promises = [];
  let count = 1;
  for (let key in newAdditons) {
    await videoAndSubPathAdd(newAdditons[key]);
    await tmdbLookup(newAdditons[key]);
    await trailerLookup(newAdditons[key], count++);
    await database.insertMovieRow(newAdditons[key]);
    if (count >= 62) {
      count = 1;
    }
  }
};

updater();
