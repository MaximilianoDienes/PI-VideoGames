const { Router } = require('express');
const { getGenres } = require('../controllers/getGenres.js')
const { getVideoGames } = require('../controllers/getVideoGames.js')
const { getVideoGamesById } = require('../controllers/getVideoGamesById.js')
const { postVideoGames } = require('../controllers/postVideoGames.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/videogames', getVideoGames);
router.get('/videogames/:id', getVideoGamesById);
router.post('/videogames', postVideoGames);
router.get('/genres', getGenres);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
