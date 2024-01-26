const axios = require( "axios" )
const express = require( "express" )
const bodyParser = require( "body-parser" )
const uid = require( "uid-safe" )
const auth = require("./endpoints/auth")
const session = require('express-session')
const loginRequired = require('./middleware/login-required')

//Instantiation of the server app
const app = new express()

//Make server utilize the bodyParse.json from body-parser package
app.use( bodyParser.json() )

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

//app.use(express.static('../../client/build'))

// Establish a router for the login-middleware to utilize
const router = express.Router();

//Establish the router to be off of the /api route
app.use('/api', router) //Put in routers folder in a file

//Link the login-middleware to the router
router.use(auth)

//The /whoami api router call to start the login middleware
router.get('/whoami',loginRequired,(req, res) => {
  console.log("Username: " + req.session.username)
  res.json({username: req.session.username});
})

// Config variable to establish the headers for communicating with the Perusall API
const config = { //put into router file
  headers: {
    "X-Institution": process.env.INSTITUTION,
    "X-API-TOKEN": process.env.TOKEN
  }
}

//Application API call to send a get to receive the users in an institution from the Perusall API
router.get('/instution_roster', (req, res) => {
  axios.get("https://app.perusall.com/api/v1/users", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})

//Application API call to send a get to receive the courses in an institution from the Perusall API
router.get('/course_data', (req, res) => {
  axios.get("https://app.perusall.com/api/v1/courses", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})

//Application API call to send a get to receive the assignment grades for a specefic assignment in an institution from the Perusall API
router.get('/assignment_grades', (req, res) => {
  var CourseId = req.body._CID;
  var AssignId = req.body._AID;
  axios.get("https://app.perusall.com/api/v1/courses/"+ CourseId +"/assignments/"+ AssignId +"/scores", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})

//Application API call to send a get to receive the analytics based on the assignment in an institution from the Perusall API
router.get('/assignment_analytics', (req, res) => {
  var CourseId = req.body._CID;
  var AssignId = req.body._AID;
  var Report = req.body._REP;
  var Part = req.body._P;
  axios.get("https://app.perusall.com/api/v1/courses/"+ CourseId +"/assignments/"+ AssignId +"/report/"+ Report +"/" + Part, config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})

// We use the bodyparser middleware to process incoming
// request bodies
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app;