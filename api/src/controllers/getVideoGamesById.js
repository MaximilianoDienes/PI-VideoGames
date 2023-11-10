const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;

const getVideoGamesById = async (req, res) => {
    try {
        const { id } = req.params;

        if (id.includes('-')) {
            const matchingGame = await Videogame.findOne({where: {id: id}, include: Genre});
            res.status(201).json(matchingGame);
        } 
        
        else {
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const platforms = response.data.platforms.map(p => p.platform.name).join(", ");
            const genres = response.data.genres.map(g => g.name);

            const videogame = {
                    name: response.data.name,
                    platforms: platforms,
                    image: response.data.background_image,
                    releasedate: response.data.released,
                    rating: response.data.rating,
                    description: response.data.description,
                    genre: genres
            }

            res.status(201).json(videogame);
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {
    getVideoGamesById
};