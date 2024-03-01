const axios = require( "axios" )
const express = require( "express" )
const auth = require("./auth")
const loginRequired = require("../middleware/login-required")

const router = express.Router();

const config = { //put into router file
    headers: {
      "X-Institution": process.env.INSTITUTION,
      "X-API-TOKEN": process.env.TOKEN
    }
}

router.use(auth);

//The /whoami api router call to start the login middleware
router.get('/whoami', loginRequired,(req, res) => {
    console.log("Username: " + req.session.username)
    res.json({username: req.session.username});
  })

//Application API call to send a get to receive the users in an institution from the Perusall API
router.get('/institution_roster', (req, res) => {
    axios.get("https://app.perusall.com/api/v1/users", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the courses in an institution from the Perusall API
router.post('/course_data', (req, res) => {
    var courseId = req.body._CID;
    console.log(courseId);
    axios.get("https://app.perusall.com/api/v1/courses/" + courseId, config).then((response)=>{res.json(response.data); console.log(response.data);}).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the assignment grades for a specefic assignment in an institution from the Perusall API
router.post('/assignment_grades', (req, res) => {
    var courseId = req.body._CID;
    var assignmentId = req.body._AID;
    axios.get("https://app.perusall.com/api/v1/courses/"+ courseId +"/assignments/"+ assignmentId +"/scores", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the analytics based on the assignment in an institution from the Perusall API
router.post('/assignment_analytics', (req, res) => {
    var courseId = req.body._CID;
    var assignmentId = req.body._AID;
    var report = req.body._REP;
    var part = req.body._P;
    axios.get("https://app.perusall.com/api/v1/courses/"+ courseId +"/assignments/"+ assignmentId +"/report/"+ report +"/" + part, config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the list of courses of the given user id in an institution from the Perusall API
router.post('/user_course_list', (req,res) => {
    var courseId = req.body._CID;
    var userId = req.body._UID
    axios.get("https://app.perusall.com/api/v1/courses/" + courseId + "/" + userId, config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the list of courses in an institution from the Perusall API
router.get('/institution_courses', (req,res) => {
    axios.get("https://app.perusall.com/api/v1/courses/", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the list of assignments from the given course id in an institution from the Perusall API
router.post('/course_assignments', (req,res) => {
    var courseId = req.body._CID;
    axios.get("https://app.perusall.com/api/v1/courses/" + courseId + "/assignments", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the annotations from the course of the given course id on the assignment with the given assignment id in an institution from the Perusall API
router.post('/assignment_annotations', (req,res) => {
    var courseId = req.body._CID;
    var assignmentId = req.body._AID;
    axios.get("https://app.perusall.com/api/v1/courses/" + courseId + "/assignments/" + assignmentId + "/annotations", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})

// exports the router
module.exports = router;