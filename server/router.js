const express = require('express');
const model = require('./model');
const router = express.Router();

router.get('/mov', (req, res) => {
  // console.log(req);
  model.listMovies(req, res);
});

router.get('/mov/byYr', (req, res) => {
  // console.log(req);
  model.listMoviesNewFilterFunction(req, res);
});

router.get('/mov/byGenre', (req, res) => {
  // console.log(req);
  model.listMoviesNewFilterFunction(req, res);
});

router.get('/mov/yrs', (req, res) => {
  // console.log(req);
  model.listMoviesNewFilterFunction(req, res);
});

router.get('/tv', (req, res) => {
  // console.log(req);
  model.listTv(req, res);
});

router.get('/searchMovies', (req, res) => {
  // console.log(req);
  model.searchMovies(req, res);
});

router.get('/searchTV', (req, res) => {
  // console.log(req);
  model.searchTv(req, res);
});

router.get('/watch/:videoName', (req, res) => {
  // console.log(req);
  model.watch(req, res);
});

router.get('/seen/:videoID', (req, res) => {
  // console.log(req);
  model.seen(req, res);
});

module.exports = router;
