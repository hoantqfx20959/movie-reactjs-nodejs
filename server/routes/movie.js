const express = require('express');

const movieController = require('../controllers/movie');
// xác thực user
const isAuth = require('../middleware/auth');

const router = express.Router();

router.get('/tv', isAuth, movieController.getTv);

router.get('/movies/trending', isAuth, movieController.getTrending);

router.get('/movies/top-rate', isAuth, movieController.getTopRate);

router.get('/movies/discover', isAuth, movieController.getDiscover);

router.post('/movies/video', isAuth, movieController.postVideo);

router.get('/movies/search', isAuth, movieController.getSearch);

router.post('/movies/search', isAuth, movieController.postSearch);

module.exports = router;
