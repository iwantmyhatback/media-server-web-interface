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
