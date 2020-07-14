const config = require('../config/config.js');
const axios = require('axios');

let trailerLookup = (movie, count) => {
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?key=${config.api.youtube[count]}&q=${movie.name.split(' ').join('+')}+${
        movie.year
      }+trailer&part=snippet&type=video`
    )
    .then((data) => {
      movie['trailerPath'] = `http://www.youtube.com/watch?v=${data.data.items[0].id.videoId}`;
      console.log(`*** Retrieved Trailer For ${movie.name} ***`);
      return movie;
    })
    .catch((error) => {
      console.error(`!!! Error Retrieving Trailer For: ${movie.name} With API Key: ${config.api.youtube[count]} !!!`);
      console.error(`!!! Reason: ${error.response.data.error.errors[0].reason} !!!`);
      // console.log(error.response.data.error.errors);
    });
};

module.exports = trailerLookup;
