const config = require('../config/config.js');
const database = require('../server/database.js');
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const promreaddir = util.promisify(fs.readdir);

function wait(ms) {
  var start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

let movieDirsObj = {};

let buildCurrentCollection = () => {
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
      let promises = [];
      for (let key in data) {
        promises.push(
          axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=${config.api.tmdb}&query=${data[key]['name']}`)
            .then((result) => {
              // ATTACH MOVIE DATA FROM TMDB TO OBJECT
              if (result.data.results[0]) {
                movieDirsObj[key]['genres'] = result.data.results[0]['genre_ids'];
                movieDirsObj[key]['description'] = result.data.results[0]['overview'];
                movieDirsObj[key]['avgRating'] = result.data.results[0]['vote_average'];
                movieDirsObj[key]['posterPath'] = `https://image.tmdb.org/t/p/w500/${
                  result.data.results[0]['poster_path'] ? result.data.results[0]['poster_path'] : result.data.results[0]['backdrop_path']
                }`;
                if (result.data.results[0]['poster_path'] === null && result.data.results[0]['backdrop_path'] === null) {
                  movieDirsObj[key]['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
                }
              } else {
                movieDirsObj[key]['description'] = `Information on ${data[key]['name']} Was Not Found On TMDB`;
                movieDirsObj[key]['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
                movieDirsObj[key]['avgRating'] = null;
              }
              return result;
            })
            .catch((error) => {
              console.error('Error Fetching Movie Data From TMDB');
              // console.error(data[key]['name']);
              // console.error(error);
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
      let promises = [];
      let count = 0;
      for (let key in result) {
        // console.log(result[key].name, result[key].year);
        // WAIT TO PREVEN YOUTUBE API FROM BEING OVERWHELMED
        wait(250);
        if (count <= 61) {
          count++;
        } else {
          count = 1;
        }
        promises.push(
          axios
            .get(
              `https://www.googleapis.com/youtube/v3/search?key=${config.api.youtube[count]}&q=${result[key].name.split(' ').join('+')}+${
                result[key].year
              }+trailer&part=snippet&type=video`
            )
            .then((data) => {
              // console.log(data.data.items[0].snippet.title);
              // console.log(data.data.items[0].id.videoId);
              movieDirsObj[key]['trailerPath'] = `http://www.youtube.com/watch?v=${data.data.items[0].id.videoId}`;
              // console.log(movieDirsObj[key]);
              console.log('ADDED', result[key].name);
              // console.log(movieDirsObj[key]);
              return movieDirsObj[key];
            })
            .catch((error) => {
              console.error('Youtube Error', result[key].name, '----------', config.api.youtube[count]);
              // console.error(error);
            })
        );

        // STOP YOUTUBE API OVERDRAW WITH BELOW BREAK
        //   break;
        // WAIT TO PREVEN YOUTUBE API FROM BEING OVERWHELMED
        wait(250);
      }
      return Promise.all(promises).then((data) => {
        return movieDirsObj;
      });
    })
    .then((data) => {
      return movieDirsObj;
    });
};

buildCurrentCollection()
  .then((data) => {
    database.truncateMovies();
    return data;
  })
  .then((data) => {
    for (let key in data) {
      database.insertMovieRow(data[key]);
    }
  });

module.exports = movieDirsObj;
