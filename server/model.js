const fs = require('fs');
const database = require('../ETL/addData.js');
const mediaPath = '/Volumes/share';

module.exports.listMovies = (req, res) => {
  return database.getAllMovies().then((movieList) => {
    res.send(movieList.rows);
  });
};

module.exports.listYears = (req, res) => {
  return database.getYears().then((yearList) => {
    yearList.rows.unshift({ year: 'ALL' });
    res.send(yearList.rows);
  });
};

module.exports.listMoviesByYear = (req, res) => {
  let searchYear = req.query.searchYear;
  if (searchYear === 'ALL') {
    return database.getAllMovies().then((movieList) => {
      res.send(movieList.rows);
    });
  } else {
    return database.moviesByYear(searchYear).then((movieList) => {
      res.send(movieList.rows);
    });
  }
};

module.exports.listTv = (req, res) => {
  return database.getAllShows().then((showList) => {
    res.send(showList.rows);
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
