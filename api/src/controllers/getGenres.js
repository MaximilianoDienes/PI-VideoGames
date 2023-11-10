const { Genre } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;

const getGenres = async (req, res) => {
    try {
        const dbGenres = await Genre.findAll()
        if (dbGenres.length === 0) {
            const result = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
            for (genreData of result.data.results) {
                await Genre.findOrCreate({ where: {name: genreData.name}})
            }
            const dbGenres = await Genre.findAll()
            res.status(201).json(dbGenres);
        } 
        else res.status(201).json(dbGenres);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getGenres
}