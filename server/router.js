const express = require('express');
const model = require('./model');
const router = express.Router();

router.get('/mov', (req, res) => {
  console.log('Passed to router', req.query);
  model.listMoviesNewFilterFunction(req, res);
});

router.get('/mov/yrs', (req, res) => {
  // console.log(req);
  model.listYears(req, res);
});

router.get('/tv', (req, res) => {
  // console.log(req);
  model.listTv(req, res);
});

router.get('/seen/:videoID', (req, res) => {
  // console.log(req);
  model.seen(req, res);
});

module.exports = router;

//////// POSSIBLE FUNCTIONALITY ADDITIONS /////////////////////

// WATCH FILE (NOT IMPLEMENTED)
//
// router.get('/watch/:videoName', (req, res) => {
//   // console.log(req);
//   model.watch(req, res);
// });

// SEARCH TV SERVER SIDE (NOT IMPLEMENTED)
//
// router.get('/searchTV', (req, res) => {
//   // console.log(req);
//   model.searchTv(req, res);
// });

//////// FORMER FUNCTIONS /////////////////////////////////////

// SEARCH MOVIES SERVER SIDE (NOT IMPLEMENTED)
//
// router.get('/searchMovies', (req, res) => {
//   // console.log(req);
//   model.searchMovies(req, res);
// });
//
//
// GET MOVIES BY YEAR (OLD FUNCTION)
//
// router.get('/mov/byYr', (req, res) => {
//   // console.log(req);
//   model.listMoviesNewFilterFunction(req, res);
// });
//
// GET MOVIES BY GENRE (OLD FUNCTION)
//
// router.get('/mov/byGenre', (req, res) => {
//   // console.log(req);
//   model.listMoviesNewFilterFunction(req, res);
// });

// GET ALL MOVIES (OLD FUNCTION)
// router.get('/mov', (req, res) => {
//   // console.log(req);
//   model.listMovies(req, res);
// });
