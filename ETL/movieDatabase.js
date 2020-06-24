const config = require('../config/config.js');
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const promreaddir = util.promisify(fs.readdir);

let movieDirsObj = {};

let buildCurrentCollection = () => {
  let dirPathfinder = () => {
    // READ MOVIES DIRECTORY AND CREATE ARRAY OF INNER FILES AND DIRECTORIES
    return promreaddir(`${config.mediaPath}/Media/Video Media/Movies`)
      .then((moviesArray) => {
        // ITERATE TO REMOVE (HIDDEN) METADATA FILES AND TRANSFER INTO OBJECT WITH PATHS
        for (let i = 0; i < moviesArray.length; i++) {
          if (moviesArray[i][0] !== '.') {
            movieDirsObj[moviesArray[i]] = { dirPath: `${config.mediaPath}/Media/Video Media/Movies/${moviesArray[i]}/` };
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
              promreaddir(`${config.mediaPath}/Media/Video Media/Movies/${key}`).then((seriesDirectoryContents) => {
                // ITERATE FILES IN SERIES DIRECTORY AND FILTER AND ADD DIRECTORIES WITH PATHS TO "movieDirsObj"
                for (let i = 0; i < seriesDirectoryContents.length; i++) {
                  if (seriesDirectoryContents[i][0] !== '.') {
                    movieDirsObj[seriesDirectoryContents[i]] = {
                      dirPath: `${config.mediaPath}/Media/Video Media/Movies/${key}/${seriesDirectoryContents[i]}/`,
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
      });
  };

  let videoAndSubPathAdd = () => {
    return dirPathfinder()
      .then((transformedDirObject) => {
        let promises = [];
        for (let key in transformedDirObject) {
          movieDirsObj[key]['name'] = key.split('[')[0].trim();
          movieDirsObj[key]['year'] = key.split('[')[1].slice(0, -1);
          promises.push(
            promreaddir(`${transformedDirObject[key]['dirPath']}`).then((movieFilesArray) => {
              for (let i = 0; i < movieFilesArray.length; i++) {
                if (movieFilesArray[i][0] !== '.') {
                  // IF EXTENTION IS MP4, AVI, MKV, MOV, DIVX, WMV THEN MAKE PATH TO MOVIE FILE
                  if (
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.mp4' ||
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.avi' ||
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.mkv' ||
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.mov' ||
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.wmv' ||
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.m4v' ||
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === 'divx'
                  ) {
                    // ADD "videoPath" PATH TO "movieDirsObj"
                    movieDirsObj[key]['videoPath'] = `${movieDirsObj[key]['dirPath']}/${movieFilesArray[i]}`;

                    // TEST FOR BAD VIDEOPATH (exceptions):
                    // console.log(movieDirsObj[key]['videoPath'] ? true : `Video Path Error: ${key}`);
                  }
                  // IF EXTENTION IS SRT, SUB MAKE PATH TO SUBS
                  else if (
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.srt' ||
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.sub' ||
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.sbv' ||
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.idx' ||
                    movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.vtt'
                  ) {
                    // ADD "LANG-subsPath" PATH TO "movieDirsObj"
                    let subName = `${movieFilesArray[i].substr(movieFilesArray[i].length - 7)}-subsPath`;
                    movieDirsObj[key][subName] = `${movieDirsObj[key]['dirPath']}/${movieFilesArray[i]}`;

                    // TEST FOR BAD SUBSPATH (exceptions):
                    // console.log(movieDirsObj[key][subName] ? true : `Subtitle Path Error: ${key}`);
                  }
                }
              }
            })
          );
        }
        return Promise.all(promises);
      })
      .catch((err) => {
        console.error('Error Finding Video or Subtitle Paths');
      })
      .then((testData) => {
        // DIAGNOSTIC TEST (CHECK ANY MOVIES PROPERTIES AND OBJECT PROGRESS)
        // console.log(movieDirsObj);
        return movieDirsObj;
      });
  };

  return videoAndSubPathAdd()
    .then((data) => {
      // console.log(data);
      return data;
    })
    .then((data) => {
      let promises = [];
      for (let key in data) {
        promises.push(
          axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=${config.api.tmdb}&query=${data[key]['name']}`)
            .then((result) => {
              // DISPLAY MOVIES SEARCHED AND RESULTS
              // console.log(data[key]['name']);
              // console.log(result.data.results);
              if (result.data.results[0]) {
                movieDirsObj[key]['genres'] = result.data.results[0]['genre_ids'];
                movieDirsObj[key]['description'] = result.data.results[0]['overview'];
                movieDirsObj[key]['avgRating'] = result.data.results[0]['vote_average'];
                // movieDirsObj[key]['backDropPath'] = `https://image.tmdb.org/t/p/w500/${result.data.results[0]['backdrop_path']}`;
                movieDirsObj[key]['posterPath'] = `https://image.tmdb.org/t/p/w500/${
                  result.data.results[0]['poster_path'] ? result.data.results[0]['poster_path'] : result.data.results[0]['backdrop_path']
                }`;

                if (result.data.results[0]['poster_path'] === null && result.data.results[0]['backdrop_path'] === null) {
                  movieDirsObj[key]['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
                }
              } else {
                movieDirsObj[key]['description'] = `Information on: ${data[key]['name']} Was Not Found On TMDB`;
                movieDirsObj[key]['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
                // movieDirsObj[key]['backDropPath'] = null;
                movieDirsObj[key]['avgRating'] = null;
              }
            })
            .catch((error) => {
              console.error('Error Fetching Movie Data From TMDB');
              console.error(data[key]['name']);
              console.error(error);
            })
        );
        // USE THIS BREAK TO STOP FOR LOOP FROM SENDING 2000+ REQUESTS TO TMDB WHILE DEBUGGING
        // break;
      }
      return Promise.all(promises).then((data) => {
        return movieDirsObj;
      });
    })
    .catch((error) => {
      console.error('Error Adding TMDB data to movieDirsObj');
    })
    .then((result) => {
      console.log(result);
      return result;
    });
};

buildCurrentCollection();

module.exports = movieDirsObj;
