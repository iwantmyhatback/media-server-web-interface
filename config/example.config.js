const api = {
  youtube: {
    // Allows for multiple youtube API keys if you are hitting the maximum requests per day when building your database (current allocation is 1000 requests per day)
    1: process.env.YOUTUBE_API_KEY,
    2: process.env.YOUTUBE_API_KEY,
  },
  tmdb: process.env.TMDB_API_KEY,
};
const owner = process.env.USER_NAME;
const service = process.env.SERVICE_NAME;
const moviePath = process.env.MOVIE_DIRECTORY_PATH;
const tvPath = process.env.TV_DIRECTORY_PATH;
const pgCredentials = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOSTNAME,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
};

module.exports.owner = owner;
module.exports.service = service;
module.exports.api = api;
module.exports.moviePath = moviePath;
module.exports.tvPath = tvPath;
module.exports.pgCredentials = pgCredentials;
