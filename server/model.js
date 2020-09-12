const database = require('./database.js');

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

module.exports.listMoviesByGenre = (req, res) => {
  let searchGenre = req.query.searchGenre;
  if (searchGenre === 'ALL') {
    return database.getAllMovies().then((movieList) => {
      res.send(movieList.rows);
    });
  } else {
    return database.moviesByGenre(searchGenre).then((movieList) => {
      res.send(movieList.rows);
    });
  }
};

module.exports.listTv = (req, res) => {
  return database.getAllShows().then((showList) => {
    res.send(showList.rows);
  });
};
