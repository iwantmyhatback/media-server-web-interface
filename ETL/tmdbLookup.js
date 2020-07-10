const config = require('../config/config.js');
const axios = require('axios');

let getMovieInfo = (movie) => {
  return axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${config.api.tmdb}&query=${movie.name}`)
    .then((result) => {
      // ATTACH MOVIE DATA FROM TMDB TO OBJECT
      if (result.data.results[0]) {
        movie['genres'] = result.data.results[0]['genre_ids'];
        movie['description'] = result.data.results[0]['overview'];
        movie['avgRating'] = result.data.results[0]['vote_average'];
        movie['posterPath'] = `https://image.tmdb.org/t/p/w500/${
          result.data.results[0]['poster_path'] ? result.data.results[0]['poster_path'] : result.data.results[0]['backdrop_path']
        }`;
        if (result.data.results[0]['poster_path'] === null && result.data.results[0]['backdrop_path'] === null) {
          movie['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
        }
      } else {
        movie['description'] = `Information on ${data[key]['name']} Was Not Found On TMDB`;
        movie['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
        movie['avgRating'] = null;
      }
      return movie;
    })
    .catch((error) => {
      console.error('Error Fetching Movie Data From TMDB');
      // console.error(data[key]['name']);
      // console.error(error);
    });
};

module.exports = getMovieInfo;
