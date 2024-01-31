const axios = require( "axios" )
const express = require( "express" )
const bodyParser = require( "body-parser" )
const uid = require( "uid-safe" )
const auth = require("./endpoints/auth")
const session = require('express-session')
const loginRequired = require('./middleware/login-required')
const { institutionCourses, institutionRoster, courseData, assignmentGrades, assignmentAnalytics, userCourseList, courseAssignments, assignmentAnnotations } = require("./routers/api.js")

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
router.use(auth);


//The /whoami api router call to start the login middleware
router.get('/whoami',loginRequired,(req, res) => {
  console.log("Username: " + req.session.username)
  res.json({username: req.session.username});
})

// Config variable to establish the headers for communicating with the Perusall API
// const config = { //put into router file
//   headers: {
//     "X-Institution": process.env.INSTITUTION,
//     "X-API-TOKEN": process.env.TOKEN
//   }
// }

// The /institution_roster api call to get users in the institution
router.get('/institution_roster', institutionRoster, (req, res));

// The /course_data api call to get the data from a given course
router.get('/course_data', courseData, (req, res));

// The /assignment_grades api call to get the grades of a given assignment from a given course
router.get('/assignment_grades', assignmentGrades, (req, res));

// The /assignment_analytics api to get the analytics of a given assignment on a given course
router.get('/assignment_analytics', assignmentAnalytics, (req, res));

// The /user_course_list api call to get the courses of a given user id
router.get('/user_course_list', userCourseList, (req, res));

// The /institution_courses api call to get the list of courses of the intitution
router.get('/institution_courses', institutionCourses, (req, res));

// The /course_assignments api call to get the assignments of the given course id
router.get('/course_assignments', courseAssignments, (req, res));

// The /assignment_annotations api call to get the annotations of a given assignment id in a given course id
router.get('/assignment_annotations', assignmentAnnotations, (req, res));

// We use the bodyparser middleware to process incoming
// request bodies
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app;