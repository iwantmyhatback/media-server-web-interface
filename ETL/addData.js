const config = require('../config/config.js');

const pg = require('pg');
var Promise = require('bluebird');

Object.keys(pg).forEach(function (key) {
  var Class = pg[key];
  if (typeof Class === 'function') {
    Promise.promisifyAll(Class.prototype);
    Promise.promisifyAll(Class);
  }
});
Promise.promisifyAll(pg);

const pool = new pg.Pool(config.pgCredentials);

let getAllMovies = () => {
  return pool
    .query('SELECT * FROM movies ORDER BY name asc')
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

let insertMovieRow = (movie) => {
  return pool
    .query(
      `INSERT INTO movies (name, "dirPath", year, "videoPath", genres, description, "avgRating", "posterPath", "trailerPath")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      [
        movie.name,
        movie.dirPath,
        movie.year,
        movie.videoPath,
        JSON.stringify(movie.genres),
        movie.description,
        movie.avgRating,
        movie.posterPath,
        movie.trailerPath,
      ]
    )
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(movie.name);
      console.error(error);
    });
};

let truncateMovies = () => {
  return pool
    .query('TRUNCATE movies')
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports.insertMovieRow = insertMovieRow;
module.exports.getAllMovies = getAllMovies;
module.exports.truncateMovies = truncateMovies;
