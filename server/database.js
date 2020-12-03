// SETUP /////////////////////////////////////////////////////////////////////////////

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

// MOVIES ////////////////////////////////////////////////////////////////////////////

// NEW FILTER FUNCTION //////////////////////////////////////////////
module.exports.filteredMovies = (filters) => {
  return pool
    .query(
      'SELECT id, name, year, description, "avgRating", "posterPath", genres, "trailerPath", seen FROM movies WHERE genres @> $1 AND year=coalesce(nullif($2, -1), year) ORDER BY year desc',
      [filters.genre, filters.year]
    )
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
////////////////////////////////////////////////////////////////////

module.exports.moviesByGenre = (genre) => {
  return pool
    .query('SELECT id, name, year, description, "avgRating", "posterPath", genres, "trailerPath", seen FROM movies WHERE genres @> $1 ORDER BY year desc', [
      genre,
    ])
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports.moviesByYear = (year) => {
  return pool
    .query('SELECT id, name, year, description, "avgRating", "posterPath", genres, "trailerPath", seen FROM movies WHERE year=$1', [year])
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports.getYears = () => {
  return pool
    .query('SELECT DISTINCT year FROM movies ORDER BY year desc')
    .then((data) => {
      // console.log('*** Retrieved List Of Years From movie Table ***');
      return data;
    })
    .catch((error) => {
      console.error('!!! Error Retrieving List Of Years From movie Table');
    });
};

module.exports.getAllMovies = () => {
  return pool
    .query('SELECT id, name, year, description, "avgRating", "posterPath", genres, "trailerPath", seen FROM movies ORDER BY year desc')
    .then((data) => {
      // console.log('*** Retrieved All Rows From The movie Table ***');
      return data;
    })
    .catch((error) => {
      console.error('!!! Error Retrieving All Rows From The movie Table !!!');
    });
};

module.exports.insertMovieRow = (movie) => {
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
      console.log(`*** Inserted Row: ${movie.name} Into The movie Table ***`);
      return data;
    })
    .catch((error) => {
      console.log(`!!! Error Inserting Row: ${movie.name} !!!`);
    });
};

module.exports.checkTrailers = () => {
  return pool
    .query('SELECT * FROM movies WHERE "trailerPath" IS NULL')
    .then((data) => {
      console.log('*** Returned Null trailerPath Rows ***');
      return data;
    })
    .catch((error) => {
      console.error('!!! Error Retrieving Null trailerPath Rows!!!');
    });
};

module.exports.updateTrailer = (movie) => {
  return pool
    .query('UPDATE movies SET "trailerPath" = $1 WHERE name = $2', [movie.trailerPath, movie.name])
    .then((data) => {
      console.log(`*** Updated Database For Row: ${movie.name} ***`);
      return data;
    })
    .catch((error) => {
      console.error(`!!! Error Updating Database For Row: ${movie.name}!!!`);
    });
};

module.exports.truncateMovies = () => {
  return pool
    .query('TRUNCATE movies')
    .then((data) => {
      console.log('*** Truncated The movie Table ***');
      return data;
    })
    .catch((error) => {
      console.error('!!! Error Truncating The movie Table !!!');
    });
};

module.exports.setSeen = (id) => {
  return pool
    .query('UPDATE movies SET seen = NOT seen WHERE id=$1', [id])
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

// SEARCH MOVIES SERVER SIDE
//
// module.exports.searchMovies = (name) => {
//   return pool
//     .query(('SELECT * FROM movies WHERE name LIKE ' % ' || $1 || ') % ';', [name])
//     .then((data) => {
//       console.log('*** Retrieved All Rows Containing Search Term From The movie Table ***');
//       return data;
//     })
//     .catch((error) => {
//       console.error('!!! Error Retrieving All Search Term Rows From The movie Table !!!');
//     });
// };

// TELEVISION ////////////////////////////////////////////////////////////////////////

module.exports.insertShowRow = (show) => {
  return pool
    .query(
      `INSERT INTO shows (name, "dirPath", genres, description, "avgRating", "posterPath", seasons)
  VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [show.name, show.dirPath, JSON.stringify(show.genres), show.description, show.avgRating, show.posterPath, JSON.stringify(show.seasons)]
    )
    .then((data) => {
      // console.log(data);
      console.log(`*** Inserted Row: ${show.name} Into The shows Table ***`);
      return data;
    })
    .catch((error) => {
      console.log(show.name);
      console.error(error);
    });
};

module.exports.truncateShows = () => {
  return pool
    .query('TRUNCATE shows')
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports.getAllShows = () => {
  return pool
    .query('SELECT * FROM shows ORDER BY name asc')
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
