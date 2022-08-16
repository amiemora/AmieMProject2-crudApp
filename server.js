//___________________
//Dependencies
//___________________
const express = require('express')
const methodOverride  = require('method-override')
const mongoose = require ('mongoose')
const app = express ()
const db = mongoose.connection;
require('dotenv').config()
const Movie = require('./models/movieSchema.js')
const movieData = require('./models/movieData.js')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI)

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'))

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method')) // allow POST, PUT and DELETE from a form


//___________________
// Routes

// Movie.create(movieData, (err, addMovies)=>{
//     console.log('test added data.')
// })

app.get('/movies/:id/trailer', (req,res)=>{
    Movie.findById(req.params.id, (err, trailerMovie)=>{
        res.render('trailer.ejs', {movies: trailerMovie})
    })
})

// Clickable Picture Route for Iphone 
app.get('/movies/:id/phoneshow', (req,res)=>{
    Movie.findById(req.params.id, (err, foundMovie)=>{
        res.render('showPhone.ejs', {movies: foundMovie})
    })
})


// Action & Adventure Route
app.get('/movies/action', (req,res)=>{
    Movie.find({}, (err, actionAdv)=>{
        res.render('action.ejs', {movies: actionAdv})
    })
})

// History & Biography Route
app.get('/movies/history', (req,res)=>{
    Movie.find({}, (err, historyMovie)=>{
        res.render('history.ejs', {movies: historyMovie})
    })
})

// Thiller Route
app.get('/movies/thriller', (req,res)=>{
    Movie.find({}, (err, thrillerMovie)=>{
        res.render('thriller.ejs', {movies: thrillerMovie})
    })
})

// Comedy Route 
app.get('/movies/comedy', (req,res)=>{
    Movie.find({}, (err, comedyMovie)=>{
        res.render('comedy.ejs', {movies: comedyMovie})
    })
})

//Crime ROute
app.get('/movies/crime', (req,res)=>{
    Movie.find({}, (err, crimeMovie)=>{
        res.render('crime.ejs', {movies: crimeMovie})
    })
})

//Romance Route
app.get('/movies/romance', (req,res)=>{
    Movie.find({}, (err, romanceMovie)=>{
        res.render('romance.ejs', {movies: romanceMovie})
    })
})


app.get('/movies/new', (req,res)=>{
    res.render('new.ejs')
})

app.post('/movies', (req,res)=>{
    Movie.create(req.body, (err, newMovie)=>{
        res.redirect('/movies')
    })
})

app.get('/movies/:id/edit', (req,res)=>{
    Movie.findById(req.params.id, (err, editStream)=>{
        res.render('edit.ejs', {movies: editStream})
    })
})

app.put('/movies/:id', (req,res)=>{
    Movie.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updateStream)=>{
        res.redirect('/movies')
    })
})

app.get('/movies', (req,res) =>{
    Movie.find({}, (err, allMovies)=>{
        res.render('index.ejs', {movies: allMovies})
    })
})



app.get('/movies/:id', (req,res)=>{
    Movie.findById(req.params.id, (err, foundMovie)=>{
        res.render('show.ejs', {movies: foundMovie})
    })
})

app.delete('/movies/:id', (req,res)=>{
    Movie.findByIdAndRemove(req.params.id, (err,data)=>{
        res.redirect('/movies')
    })
})

//___________________
//localhost:3000


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT))








