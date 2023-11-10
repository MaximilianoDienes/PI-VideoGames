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

            while (matchingGames.length <= 15) {
                const dbGames = await Videogame.findAll({where: {name: {[Op.iLike]: `%${name}%`}}, limit: 15});

                for (const game of dbGames) {
                    console.log(game)
                    matchingGames.push(game);
                }

                for (const videogameData of response.data.results) {
                    console.log(videogameData);
                    const platforms = videogameData.platforms.map(p => p.platform.name).join(", ");
                    const videogame = {
                        name: videogameData.name,
                        platforms: platforms,
                        image: videogameData.background_image,
                        releasedate: videogameData.released,
                        rating: videogameData.rating,
                        description: 'placeholder'
                    }
        
                    matchingGames.push(videogame);
                }
            }

            if (matchingGames.length === 0) {
                res.status(400).json({error: "No se encontró ningún videojuego que coincida con el nombre proporcionado."});
            } else res.status(200).json(matchingGames);
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

            const responses = await Promise.all(urls.map(url => axios.get(url)));
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

            responses.forEach(response => response.data.results.forEach(data => {
                const platforms = data.platforms.map(p => p.platform.name).join(", ");
                const genres = data.genres.map(g => g.name);
    
                const videogame = {
                    id: data.id,
                    name: data.name,
                    platforms: platforms,
                    image: data.background_image,
                    releasedate: data.releasedate,
                    rating: data.rating,
                    genre: genres
                }
    
                allGames.push(videogame);
            }))

            res.status(200).json(allGames);
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getVideoGames
}