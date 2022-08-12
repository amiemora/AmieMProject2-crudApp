const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {type: String},
    genre: {type: String},
    image: {type: String},
    director: {type: String},
    stream: {type: String},
    streamTwo: {type: String},
    streamThree: {type: String},
    year: {type: String},
    description: {type: String}
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie