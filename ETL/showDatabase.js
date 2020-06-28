const config = require('../config/config.js');

const fs = require('fs');
const util = require('util');
const axios = require('axios');

const promreaddir = util.promisify(fs.readdir);

let showsDirsObj = {};

let buildCurrentCollection = () => {
  let dirPathfinder = () => {
    // READ SHOWS DIRECTORY AND CREATE ARRAY OF INNER FILES AND DIRECTORIES
    return promreaddir(`${config.mediaPath}/Media/Video Media/TV`)
      .then((showsArray) => {
        // ITERATE TO REMOVE (HIDDEN) METADATA FILES AND TRANSFER INTO OBJECT WITH PATHS
        for (let i = 0; i < showsArray.length; i++) {
          if (showsArray[i][0] !== '.') {
            showsDirsObj[showsArray[i]] = { dirPath: `${config.mediaPath}/Media/Video Media/TV/${showsArray[i]}/` };
          }
        }
        // PASS ON OBJECT OF DIRECTORIES
        return showsDirsObj;
      })
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
                return responseData.data.results[0];
              })
              .then((topResponseData) => {
                if (topResponseData) {
                  showsDirsObj[key]['genres'] = topResponseData['genre_ids'];
                  showsDirsObj[key]['description'] = topResponseData['overview'];
                  showsDirsObj[key]['avgRating'] = topResponseData['vote_average'];
                  // showsDirsObj[key]['backDropPath'] = `https://image.tmdb.org/t/p/w500/${topResponseData['backdrop_path']}`;
                  showsDirsObj[key]['posterPath'] = `https://image.tmdb.org/t/p/w500/${
                    topResponseData['poster_path'] ? topResponseData['poster_path'] : topResponseData['backdrop_path']
                  }`;

                  if (topResponseData['poster_path'] === null && topResponseData['backdrop_path'] === null) {
                    showsDirsObj[key]['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
                  }
                } else {
                  showsDirsObj[key]['description'] = `Information on: ${showsDirsObj[key]['name']} Was Not Found On TMDB`;
                  showsDirsObj[key]['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
                  showsDirsObj[key]['avgRating'] = null;
                }

                // console.log(showsDirsObj[key]);
              })
          );
        }
        return Promise.all(promises);
      })
      .then(() => {
        return showsDirsObj;
      });
  };

  dirPathfinder().then((data) => {
    console.log(data);
  });

  // let videoAndSubPathAdd = () => {
  //   return dirPathfinder()
  //     .then((transformedDirObject) => {
  //       let promises = [];
  //       for (let key in transformedDirObject) {
  //         showsDirsObj[key]['name'] = key.split('[')[0].trim();
  //         showsDirsObj[key]['year'] = key.split('[')[1].slice(0, -1);
  //         promises.push(
  //           promreaddir(`${transformedDirObject[key]['dirPath']}`).then((movieFilesArray) => {
  //             for (let i = 0; i < movieFilesArray.length; i++) {
  //               if (movieFilesArray[i][0] !== '.') {
  //                 // IF EXTENTION IS MP4, AVI, MKV, MOV, DIVX, WMV THEN MAKE PATH TO MOVIE FILE
  //                 if (
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.mp4' ||
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.avi' ||
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.mkv' ||
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.mov' ||
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.wmv' ||
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.m4v' ||
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === 'divx'
  //                 ) {
  //                   // ADD "videoPath" PATH TO "showsDirsObj"
  //                   showsDirsObj[key]['videoPath'] = `${showsDirsObj[key]['dirPath']}/${movieFilesArray[i]}`;

  //                   // TEST FOR BAD VIDEOPATH (exceptions):
  //                   // console.log(showsDirsObj[key]['videoPath'] ? true : `Video Path Error: ${key}`);
  //                 }
  //                 // IF EXTENTION IS SRT, SUB MAKE PATH TO SUBS
  //                 else if (
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.srt' ||
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.sub' ||
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.sbv' ||
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.idx' ||
  //                   movieFilesArray[i].substr(movieFilesArray[i].length - 4) === '.vtt'
  //                 ) {
  //                   // ADD "LANG-subsPath" PATH TO "showsDirsObj"
  //                   let subName = `${movieFilesArray[i].substr(movieFilesArray[i].length - 7)}-subsPath`;
  //                   showsDirsObj[key][subName] = `${showsDirsObj[key]['dirPath']}/${movieFilesArray[i]}`;

  //                   // TEST FOR BAD SUBSPATH (exceptions):
  //                   // console.log(showsDirsObj[key][subName] ? true : `Subtitle Path Error: ${key}`);
  //                 }
  //               }
  //             }
  //           })
  //         );
  //       }
  //       return Promise.all(promises);
  //     })
  //     .catch((err) => {
  //       console.error('Error Finding Video or Subtitle Paths');
  //     })
  //     .then((testData) => {
  //       // DIAGNOSTIC TEST (CHECK ANY MOVIES PROPERTIES AND OBJECT PROGRESS)
  //       // console.log(showsDirsObj);
  //       return showsDirsObj;
  //     });
  // };

  // return videoAndSubPathAdd()
  //   .then((data) => {
  //     // console.log(data);
  //     return data;
  //   })
  //   .then((data) => {
  //     let promises = [];
  //     for (let key in data) {
  //       promises.push(
  //         axios
  //           .get(`https://api.themoviedb.org/3/search/movie?api_key=${config.api.tmdb}&query=${data[key]['name']}`)
  //           .then((result) => {
  //             // DISPLAY MOVIES SEARCHED AND RESULTS
  //             // console.log(data[key]['name']);
  //             // console.log(result.data.results);
  //             if (result.data.results[0]) {
  //               showsDirsObj[key]['description'] = result.data.results[0]['overview'];
  //               showsDirsObj[key][
  //                 'posterPath'
  //               ] = `https://image.tmdb.org/t/p/w500/${result.data.results[0]['poster_path']}`;
  //               showsDirsObj[key][
  //                 'backDropPath'
  //               ] = `https://image.tmdb.org/t/p/w500/${result.data.results[0]['backdrop_path']}`;
  //               showsDirsObj[key]['avgRating'] = result.data.results[0]['vote_average'];
  //             } else {
  //               showsDirsObj[key]['description'] = `Information on: ${data[key]['name']} Was Not Found On TMDB`;
  //               showsDirsObj[key]['posterPath'] = null;
  //               showsDirsObj[key]['backDropPath'] = null;
  //               showsDirsObj[key]['avgRating'] = null;
  //             }
  //           })
  //           .catch((error) => {
  //             console.error('Error Fetching Movie Data From TMDB');
  //             console.error(data[key]['name']);
  //             console.error(error);
  //           })
  //       );
  //       // USE THIS BREAK TO STOP FOR LOOP FROM SENDING 2000+ REQUESTS TO TMDB WHILE DEBUGGING
  //       // break;
  //     }
  //     return Promise.all(promises).then((data) => {
  //       return showsDirsObj;
  //     });
  //   })
  //   .catch((error) => {
  //     console.error('Error Adding TMDB data to showsDirsObj');
  //   })
  //   .then((result) => {
  //     // console.log(result);
  //     return result;
  //   });
};

buildCurrentCollection();

module.exports = showsDirsObj;
