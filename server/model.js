const database = require('./database.js');
const axios = require('axios');
const config = require('../config/config.js');

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

module.exports.getEditTitleInfo = (req, res) => {
  titleEditName = req.query.name;
  titleEditYear = req.query.year;
  console.log(titleEditName, titleEditYear);
  return axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${config.api.tmdb}&query=${titleEditName}`)
    .then((data) => {
      let results = [];
      for (let result of data.data.results) {
        let movie = {
          id: Math.random(),
          name: result.title,
          year: titleEditYear,
          description: result.overview,
          avgRating: result.vote_average,
          genres: result.genre_ids,
          trailerPath: 'placeholder',
          seen: false,
        };
        movie['posterPath'] = `https://image.tmdb.org/t/p/w500/${result['poster_path'] ? result['poster_path'] : result['backdrop_path']}`;
        if (result['poster_path'] === null && result['backdrop_path'] === null) {
          movie['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
        }

        results.push(movie);
      }
      res.send(results);
    })
    .catch((error) => {
      console.log('!!! There Was An Error Fetching Edit Data From TMDB !!!');
    });
};

module.exports.updateEditTitle = (req, res) => {
  let newTitleInfo = req.body.data.newTitleInfo;
  return database.updateTitleInfo(newTitleInfo);
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
