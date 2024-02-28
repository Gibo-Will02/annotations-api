const axios = require( "axios" )
const express = require( "express" )
const bodyParser = require( "body-parser" )
const uid = require( "uid-safe" )
const auth = require("./routers/auth")
const session = require('express-session')
const loginRequired = require('./middleware/login-required')

//Instantiation of the server app
const app = new express()

//Make server utilize the bodyParse.json from body-parser package
app.use( bodyParser.json() )

// We use the bodyparser middleware to process incoming
// request bodies
app.use(bodyParser.urlencoded({extended: false}));

//Establish that the app is behind a proxy
app.set('trust proxy', 1)

/**
 * Establishes the session that can save cookies
 */
app.use(session({
  secret: 'Annotation-Group-Project',
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: false,
  },
}))

const db = require("../db")

db('department').insert({departmentName: "Engineering"})

setTimeout(function(){
  db.select().table('department').then(function(rows){console.log(rows)})
}, 1000)

//Establish the router to be off of the /api route
app.use('/api', require('./routers/api')) //Put in routers folder in a file

module.exports = app;