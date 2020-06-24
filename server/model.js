const fs = require('fs');
const mediaPath = '/Volumes/share';

const movieCollection = require('../ETL/movieDatabase.js');

module.exports.listMovies = (req, res) => {
  // fs.readdir(`${mediaPath}/Media/Video Media/Movies`, (err, file) => {
  //   let movies = [];
  //   for (let movie of file) {
  //     if (movie[0] !== '.') {
  //       // console.log(movie);
  //       movies.push(movie);
  //     }
  //   }
  //   res.send(movies);
  // console.log(Object.values(movieCollection));
  res.send(
    Object.values(movieCollection).sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
  );
  // });
};

module.exports.listTv = (req, res) => {
  fs.readdir(`${mediaPath}/Media/Video Media/TV`, (err, file) => {
    let shows = [];
    for (let show of file) {
      if (show[0] !== '.') {
        // console.log(show);
        shows.push(show);
      }
    }
    res.send(shows);
  });
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
