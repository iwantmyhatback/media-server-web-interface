const config = require('../config/config.js');
const database = require('../server/database.js');
//
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const promreaddir = util.promisify(fs.readdir);

let showsDirsObj = {};

let buildCurrentCollection = () => {
  let dirPathfinder = () => {
    // READ SHOWS DIRECTORY AND CREATE ARRAY OF INNER FILES AND DIRECTORIES
    return (
      promreaddir(`${config.tvPath}/Media/Video Media/TV`)
        .then((showsArray) => {
          // ITERATE TO REMOVE (HIDDEN) METADATA FILES AND TRANSFER INTO OBJECT WITH PATHS
          for (let i = 0; i < showsArray.length; i++) {
            if (showsArray[i][0] !== '.') {
              showsDirsObj[showsArray[i]] = { dirPath: `${config.tvPath}/Media/Video Media/TV/${showsArray[i]}/` };
            }
          }
          // PASS ON OBJECT OF DIRECTORIES
          return showsDirsObj;
        })
        ///////////////////////////////////////////////////////////////////
        .then((filteredShowsObject) => {
          let promises = [];
          // ITERATE OBJECT OF USEFUL DIRECTORIES AND FIND ALL DIRECTORIES CONTAINING SERIES OF MOVIES
          for (let key in filteredShowsObject) {
            if (key.includes('[ALL]')) {
              // IF A DIRECTORY CONTAINS A SERIES ("[ALL]" KEYWORD) READ THAT DIRECTORY

              promises.push(
                promreaddir(`${config.tvPath}/Media/Video Media/TV/${key}`).then((seriesDirectoryContents) => {
                  // ITERATE FILES IN SERIES DIRECTORY AND FILTER AND ADD DIRECTORIES WITH PATHS TO "showsDirsObj"
                  for (let i = 0; i < seriesDirectoryContents.length; i++) {
                    if (seriesDirectoryContents[i][0] !== '.') {
                      showsDirsObj[seriesDirectoryContents[i]] = {
                        dirPath: `${config.tvPath}/Media/Video Media/TV/${key}/${seriesDirectoryContents[i]}/`,
                      };
                    }
                  }
                  // REMOVE SERIES DIRECTORIES ([ALL] KEYWORD]) FROM "showsDirsObj" ONCE INDIVIDUALS ARE ADDED
                  delete showsDirsObj[key];
                  return;
                })
              );
            }
          }
          return Promise.all(promises).then(() => {
            return showsDirsObj;
          });
        })
        ////////////////////////////////////////////////////
        .then((filteredShowsObject) => {
          let promises = [];
          for (let key in filteredShowsObject) {
            showsDirsObj[key]['name'] = key;
            promises.push(
              promreaddir(`${filteredShowsObject[key]['dirPath']}`).then((data) => {
                showsDirsObj[key]['seasons'] = [];
                for (let i = 0; i < data.length; i++) {
                  if (data[i][0] !== '.') {
                    showsDirsObj[key]['seasons'].push(data[i]);
                  }
                }
                return showsDirsObj[key];
              })
            );
          }
          return Promise.all(promises);
        })
        .then((updatedShows) => {
          let promises = [];
          for (let key in showsDirsObj) {
            promises.push(
              axios
                .get(`https://api.themoviedb.org/3/search/tv?api_key=ba2a8ed84b19a53a1a64ec40510fec3a&query=${key}`)
                .then((responseData) => {
                  console.log(responseData.data.results[0]);
                  return responseData.data.results[0];
                })
                .then((topResponseData) => {
                  if (topResponseData) {
                    showsDirsObj[key]['genres'] = topResponseData['genre_ids'];
                    showsDirsObj[key]['description'] = topResponseData['overview'];
                    showsDirsObj[key]['avgRating'] = topResponseData['vote_average'];
                    showsDirsObj[key]['posterPath'] = `https://image.tmdb.org/t/p/w500/${
                      topResponseData['poster_path'] ? topResponseData['poster_path'] : topResponseData['backdrop_path']
                    }`;

                    if (topResponseData['poster_path'] === null && topResponseData['backdrop_path'] === null) {
                      showsDirsObj[key]['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
                    }
                  } else {
                    showsDirsObj[key]['description'] = `Information on ${showsDirsObj[key]['name']} Was Not Found On TMDB`;
                    showsDirsObj[key]['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
                    showsDirsObj[key]['avgRating'] = null;
                  }
                })
            );
          }
          return Promise.all(promises);
        })
        .then(() => {
          return showsDirsObj;
        })
    );
  };

  dirPathfinder()
    .then((data) => {
      database.truncateShows();
      return data;
    })
    .then((data) => {
      for (let key in data) {
        database.insertShowRow(data[key]);
      }
    });
};

buildCurrentCollection();

module.exports = showsDirsObj;
