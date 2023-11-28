const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;
const { Op } = require('sequelize');

const getVideoGames = async (req, res) => {
    try {
        const { name } = req.query;

        if (name) {
            const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
            const matchingGames = []; 

            while (matchingGames.length <= 15) { // recibo hasta 15, priorizo los de la base de datos (creados por el usuario)
                const dbGames = await Videogame.findAll({where: { name: { [Op.iLike]: `%${name}%` } }, limit: 15, include: [{ model: Genre, through: 'VideogameGenre' }]});
                if (dbGames.length) {
                    for (const game of dbGames) {
                        const genres = game.dataValues.genres ? game.dataValues.genres.map(g => g.name).flat() : [];
                        const videogame = {
                          id: game.dataValues.id,
                          name: game.dataValues.name,
                          platforms: game.dataValues.platforms,
                          image: game.dataValues.image,
                          releasedate: game.dataValues.releasedate,
                          rating: game.dataValues.rating,
                          description: game.dataValues.description,
                          genre: genres
                        };
                        matchingGames.push(videogame);
                    }
                }

                for (const videogameData of response.data.results) {
                    const platforms = videogameData.platforms.map(p => p.platform.name).join(", ");
                    const genres = videogameData.genres.map(g => g.name);

                    const videogame = {
                        id: videogameData.id,
                        name: videogameData.name,
                        platforms: platforms,
                        image: videogameData.background_image,
                        releasedate: videogameData.released,
                        genre: genres,
                        rating: videogameData.rating,
                        description: videogameData.description
                    }
        
                    matchingGames.push(videogame);
                }
            }

            if (matchingGames.length === 0) {
                res.status(400).json({error: "No se encontró ningún videojuego que coincida con el nombre proporcionado."});
            } else {
                res.status(200).json(matchingGames);
            }
        }
        
        else {
            const urls = [
                `https://api.rawg.io/api/games?key=${API_KEY}&page=1`,
                `https://api.rawg.io/api/games?key=${API_KEY}&page=2`,
                `https://api.rawg.io/api/games?key=${API_KEY}&page=3`,
                `https://api.rawg.io/api/games?key=${API_KEY}&page=4`,
                `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
            ];

            const allGames = [];

            const responses = await Promise.all(urls.map(url => axios.get(url))); // hago req para los juegos de todas las páginas (1 a 5)
            const dbGames = await Videogame.findAll({include: [{ model: Genre, through: 'VideogameGenre'}]});

            if (dbGames.length > 0) {
                dbGames.forEach(response => {    
                    const genres = response.genres ? response.genres.map(g => g.name).flat() : [];
                    const videogame = {
                        id: response.id,
                        name: response.name,
                        platforms: response.platforms,
                        image: response.image,
                        releasedate: response.releasedate,
                        rating: response.rating,
                        description: response.description,
                        genre: genres
                    }
                    allGames.push(videogame);
                })
            }

            const uniquePlatforms = new Set(); // esto sirve para que no se repita ningun valor,
                                               // así es como obtengo cada plataforma única para el filtrado !
            responses.forEach(response => response.data.results.forEach(data => {
                const platforms = data.platforms.map(p => p.platform.name);
                const genres = data.genres.map(g => g.name);
                data.platforms.forEach(p => uniquePlatforms.add(p.platform.name)); // :)
    
                const videogame = {
                    id: data.id,
                    name: data.name,
                    platforms: platforms,
                    image: data.background_image,
                    releasedate: data.released,
                    rating: data.rating,
                    genre: genres
                }
    
                allGames.push(videogame);
            }))

            const allPlatforms = Array.from(uniquePlatforms); // lo convierto a un array antes de mandarlo

            res.status(200).json({allGames, allPlatforms});
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getVideoGames
}