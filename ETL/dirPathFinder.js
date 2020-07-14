const config = require('../config/config.js');
const fs = require('fs');
const util = require('util');

const promreaddir = util.promisify(fs.readdir);
let movieDirsObj = {};

let dirPathfinder = () => {
  // READ MOVIES DIRECTORY AND CREATE ARRAY OF INNER FILES AND DIRECTORIES
  return promreaddir(`${config.moviePath}/Media/Video Media/Movies`)
    .then((moviesArray) => {
      // ITERATE TO REMOVE (HIDDEN) METADATA FILES AND TRANSFER INTO OBJECT WITH PATHS
      for (let i = 0; i < moviesArray.length; i++) {
        if (moviesArray[i][0] !== '.') {
          movieDirsObj[moviesArray[i]] = { dirPath: `${config.moviePath}/Media/Video Media/Movies/${moviesArray[i]}/` };
        }
      }
      // PASS ON OBJECT OF DIRECTORIES
      return movieDirsObj;
    })
    .then((filteredMoviesObject) => {
      let promises = [];
      // ITERATE OBJECT OF USEFUL DIRECTORIES AND FIND ALL DIRECTORIES CONTAINING SERIES OF MOVIES
      for (let key in filteredMoviesObject) {
        if (key.includes('[ALL]')) {
          // IF A DIRECTORY CONTAINS A SERIES ("[ALL]" KEYWORD) READ THAT DIRECTORY

          promises.push(
            promreaddir(`${config.moviePath}/Media/Video Media/Movies/${key}`).then((seriesDirectoryContents) => {
              // ITERATE FILES IN SERIES DIRECTORY AND FILTER AND ADD DIRECTORIES WITH PATHS TO "movieDirsObj"
              for (let i = 0; i < seriesDirectoryContents.length; i++) {
                if (seriesDirectoryContents[i][0] !== '.') {
                  movieDirsObj[seriesDirectoryContents[i]] = {
                    dirPath: `${config.moviePath}/Media/Video Media/Movies/${key}/${seriesDirectoryContents[i]}/`,
                  };
                }
              }
              // REMOVE SERIES DIRECTORIES ([ALL] KEYWORD]) FROM "movieDirsObj" ONCE INDIVIDUALS ARE ADDED
              delete movieDirsObj[key];
              return;
            })
          );
        }
      }
      return Promise.all(promises);
    })
    .then(() => {
      return movieDirsObj;
    })
    .catch((error) => {
      console.error('Error Geting Directory Paths');
      console.error(error);
    });
};

module.exports = dirPathfinder;
