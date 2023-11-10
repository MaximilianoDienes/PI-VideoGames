const { Videogame } = require('../db.js');
const { Genre } = require('../db.js');

const postVideoGames = async (req, res) => {
    try {
        const { name, description, platforms, image, releasedate, rating, genres } = req.body;

        if (!name || !description || !platforms || !image || !releasedate || !rating || !genres) {
            res.status(400).json({error: 'Faltan datos'});
        }

        const videogame = {
                name: name,
                platforms: platforms,
                image: image,
                releasedate: releasedate,
                rating: rating,
                description: description
        }

        const createdGame = await Videogame.create(videogame);
        createdGame.addGenre(genres)
        

        res.status(201).json(createdGame);
        } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postVideoGames
};