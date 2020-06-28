const fs = require('fs');
const database = require('../ETL/addData.js');
const mediaPath = '/Volumes/share';

const showsObj = require('../ETL/showDatabase.js');

module.exports.listMovies = (req, res) => {
  return database.getAllMovies().then((movieList) => {
    res.send(movieList.rows);
  });
};

module.exports.listTv = (req, res) => {
  // fs.readdir(`${mediaPath}/Media/Video Media/TV`, (err, file) => {
  //   let shows = [];
  //   for (let show of file) {
  //     if (show[0] !== '.') {
  //       // console.log(show);
  //       shows.push(show);
  //     }
  //   }
  //   res.send(shows);
  // });
  res.send(
    Object.values(showsObj).sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
  );
};

module.exports.searchMovies = (req, res) => {
  // console.log(req);
  let searchTerm = req.query.searchTerm;
  fs.readdir(`${mediaPath}/Media/Video Media/Movies`, (err, file) => {
    let movies = [];
    for (let movie of file) {
      if (movie[0] !== '.') {
        // console.log(movie);
        if (movie.includes(searchTerm)) {
          movies.push(movie);
        }
      }
    }
    // console.log(movies)
    res.send(movies);
  });
};

module.exports.searchTv = (req, res) => {
  // console.log(req);
  let searchTerm = req.query.searchTerm;
  fs.readdir(`${mediaPath}/Media/Video Media/TV`, (err, file) => {
    let shows = [];
    for (let show of file) {
      if (show[0] !== '.') {
        // console.log(show);
        if (show.includes(searchTerm)) {
          shows.push(show);
        }
      }
    }
    // console.log(shows);
    res.send(shows);
  });
};
