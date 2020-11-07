const config = require('../config/config.js');
const axios = require('axios');

let getMovieInfo = (movie) => {
  return axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${config.api.tmdb}&query=${movie.name}`)
    .then((returnedData) => {
      // ATTACH MOVIE DATA FROM TMDB TO OBJECT
      let resultsCopy = JSON.parse(JSON.stringify(returnedData.data.results));

      for (let i = 0; i < returnedData.data.results.length; i++) {
        if (returnedData.data.results[i].release_date === undefined) {
          returnedData.data.results[i].release_date = '';
          resultsCopy[i].release_date = '';
        }
        if (
          !returnedData.data.results[i].release_date.includes(movie.year) ||
          !returnedData.data.results[i].release_date.includes(movie.year + 1) ||
          !returnedData.data.results[i].release_date.includes(movie.year - 1)
        ) {
          returnedData.data.results.splice(i, 1);
          i--;
        }
      }
      let relevantResults;

      if (returnedData.data.results.length > 0) {
        relevantResults = returnedData.data.results;
      } else {
        relevantResults = resultsCopy;
      }

      if (relevantResults[0]) {
        movie['genres'] = relevantResults[0]['genre_ids'];
        movie['description'] = relevantResults[0]['overview'];
        movie['avgRating'] = relevantResults[0]['vote_average'];
        movie['posterPath'] = `https://image.tmdb.org/t/p/w500/${
          relevantResults[0]['poster_path'] ? relevantResults[0]['poster_path'] : relevantResults[0]['backdrop_path']
        }`;
        if (relevantResults[0]['poster_path'] === null && relevantResults[0]['backdrop_path'] === null) {
          movie['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
        }
      } else {
        movie['description'] = `Information on ${movie['name']} Was Not Found On TMDB`;
        movie['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
        movie['avgRating'] = null;
      }
      console.log(`*** Retrieved TMDB Information For ${movie.name} ***`);
      return movie;
    })
    .catch((error) => {
      console.error('Error Fetching Movie Data From TMDB');
      // console.error(data[key]['name']);
      console.error(error);
      movie['genres'] = [];
      movie['description'] = `Information on ${movie['name']} Was Not Found On TMDB`;
      movie['posterPath'] = 'https://www.movienewz.com/img/films/poster-holder.jpg';
      movie['avgRating'] = null;
      return movie;
    });
};

module.exports = getMovieInfo;
