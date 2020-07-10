const fs = require('fs');
const util = require('util');

const promreaddir = util.promisify(fs.readdir);

let videoAndSubPathAdd = (movie) => {
  return promreaddir(`${movie['dirPath']}`).then((movieFilesArray) => {
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
          movie['videoPath'] = `${movie['dirPath']}/${movieFilesArray[i]}`;

          // TEST FOR BAD VIDEOPATH (exceptions):
          // console.log(movie['videoPath'] ? true : `Video Path Error: ${key}`);
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
          let subName = `${movieFilesArray[i].substr(-7, 3)}-subsPath`;
          movie[subName] = `${movie['dirPath']}/${movieFilesArray[i]}`;
        }
      }
    }
    return movie;
  });
};

module.exports = videoAndSubPathAdd;
