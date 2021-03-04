const database = require('./database.js');

module.exports.listMoviesNewFilterFunction = (req, res) => {
  let searchYear = req.query.searchYear === 'ALL' ? null : req.query.searchYear;
  let searchGenre = req.query.searchGenre;
  let searchSeen = req.query.searchSeen;
  let sortColumn = req.query.sortColumn;
  let sortDirection = req.query.sortDirection;

  return database
    .filteredMovies({ searchGenre: searchGenre, searchSeen: searchSeen, searchYear: searchYear, sortColumn: sortColumn, sortDirection: sortDirection })
    .then((movieList) => {
      res.send(movieList.rows);
    });
};

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

module.exports.listTv = (req, res) => {
  let searchGenre = req.query.searchGenre;
  return database.filteredShows({ searchGenre }).then((showList) => {
    res.send(showList.rows);
  });
};

module.exports.seen = (req, res) => {
  return database.setSeen(req.params.videoID).then(() => {
    res.sendStatus(200);
  });
};

//////// POSSIBLE FUNCTIONALITY ADDITIONS /////////////////////

// WATCH FILE (NOT IMPLEMENTED)
//
// module.exports.watch = (req, res) => {
//   console.log(req.params.videoName);
//   //Needs Response
// };

//////// FORMER FUNCTIONS /////////////////////////////////////

// RETURN MOVIES BY GENRE (OLD METHOD)
//
// module.exports.listMoviesByGenre = (req, res) => {
//   let searchGenre = req.query.searchGenre;
//   return database.moviesByGenre(searchGenre).then((movieList) => {
//     res.send(movieList.rows);
//   });
// };

// RETURN MOVIES BY YEAR (OLD METHOD)
//
// module.exports.listMoviesByYear = (req, res) => {
//   let searchYear = req.query.searchYear;
//   if (searchYear === 'ALL') {
//     return database.getAllMovies().then((movieList) => {
//       res.send(movieList.rows);
//     });
//   } else {
//     return database.moviesByYear(searchYear).then((movieList) => {
//       res.send(movieList.rows);
//     });
//   }
// };

// RETURN ALL SHOWS (OLD FUNCTION)
//
// module.exports.listTv = (req, res) => {
//   return database.getAllShows().then((showList) => {
//     res.send(showList.rows);
//   });
// };
