const { Router } = require('express');
const { getGenres } = require('../controllers/getGenres.js')
const { getVideoGames } = require('../controllers/getVideoGames.js')
const { getVideoGamesById } = require('../controllers/getVideoGamesById.js')
const { postVideoGames } = require('../controllers/postVideoGames.js');

const router = Router();

router.get('/videogames', getVideoGames);
router.get('/videogames/:id', getVideoGamesById);
router.post('/videogames', postVideoGames);
router.get('/genres', getGenres);

module.exports = router;
