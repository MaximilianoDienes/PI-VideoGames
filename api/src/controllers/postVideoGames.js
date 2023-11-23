const { Videogame } = require('../db.js');
const { Genre } = require('../db.js');
const sizeOf = require('image-size');
const fetch = require('node-fetch');

const isValidImageUrl = async (url) => {
    try {
        const { protocol } = new URL(url); 

        if (protocol !== 'http:' && protocol !== 'https:') { // valido que la URL empiece en http o https
            return false;
        }

        const response = await fetch(url);
        const buffer = await response.buffer();
        const dimensions = sizeOf(buffer);

        return dimensions.width > 0 && dimensions.height > 0; // si no existen las dimensiones, significa que la URL no apunta a una imagen válida
    } catch (error) {
        return false;
    }
};

const postVideoGames = async (req, res) => {
    try {
        const { name, description, platforms, image, releasedate, rating, genres } = req.body;

        if (!name || !description || !platforms || !image || !releasedate || !rating || !genres) {
            res.status(400).json({error: 'Faltan datos'});
        }

        const isValidImage = await isValidImageUrl(image);

        const finalImage = isValidImage ? image : 'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'; // si la URL no es válida, usamos la default

        const videogame = {
                name: name,
                platforms: platforms,
                image: finalImage,
                releasedate: releasedate,
                rating: rating,
                description: description
        }

        const createdGame = await Videogame.create(videogame);
        createdGame.addGenre(genres);
        

        res.status(201).json(createdGame);
        } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postVideoGames
};