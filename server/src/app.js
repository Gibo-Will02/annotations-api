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

//db('department').insert({departmentName: "Engineering"})
//var x = db('department').insert({departmentName: "Engineering"})
//console.log(x)

//Check if the database exists or if its empty, and seed it if its empty
db.migrate.currentVersion()
    .then(function(version) {
        console.log("Database Migration Version: " + version)
        if(version == 'none') {
            console.log("Database Empty - Migrating and Seeding")
            db.migrate.latest()
            .then(function() {
                return db.seed.run();
            })
            .then(function() {
                console.log("Complete!");
            })
        } else {
            console.log("Database Exists - Migrating")
            db.migrate.latest()
            // .then(function() {
            //     return db.seed.run(); //Debug line to ensure database seeds on server restart if server is up
            // })
            //.then(db.select().table('annotations').then(function(rows){console.log(rows)}))
            .then(function() {
                console.log("Complete!");
            })
        }
    })
//db('department').insert({departmentName: "Engineering"}).then(db.select().table('department').then(function(rows){console.log(rows)}))

//Establish the router to be off of the /api route
app.use('/api', require('./routers/api')) //Put in routers folder in a file

module.exports = app;