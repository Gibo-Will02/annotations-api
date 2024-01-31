const axios = require( "axios" )
const express = require( "express" )

const router = express.Router();

const config = { //put into router file
    headers: {
      "X-Institution": process.env.INSTITUTION,
      "X-API-TOKEN": process.env.TOKEN
    }
}

// possibly the same as individual exports
// module.exports = { institutionRoster, courseData, assignmentGrades, assignmentAnalytics, userCourseList, institutionCourses, courseAssignments, assignmentAnnotations }

// exports the api calls
exports.institutionRoster = institutionRoster;
exports.courseData = courseData;
exports.assignmentGrades = assignmentGrades;
exports.assignmentAnalytics = assignmentAnalytics;
exports.userCourseList = userCourseList;
exports.institutionCourses = institutionCourses;
exports.courseAssignments = courseAssignments;
exports.assignmentAnnotations = assignmentAnnotations;


//Application API call to send a get to receive the users in an institution from the Perusall API
const institutionRoster = router.get('/institution_roster', (req, res) => {
    axios.get("https://app.perusall.com/api/v1/users", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the courses in an institution from the Perusall API
const courseData = router.get('/course_data', (req, res) => {
    var courseId = req.body._CID;
    axios.get("https://app.perusall.com/api/v1/courses" + courseId, config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the assignment grades for a specefic assignment in an institution from the Perusall API
const assignmentGrades = router.get('/assignment_grades', (req, res) => {
    var courseId = req.body._CID;
    var assignmentId = req.body._AID;
    axios.get("https://app.perusall.com/api/v1/courses/"+ courseId +"/assignments/"+ assignmentId +"/scores", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the analytics based on the assignment in an institution from the Perusall API
const assignmentAnalytics = router.get('/assignment_analytics', (req, res) => {
    var courseId = req.body._CID;
    var assignmentId = req.body._AID;
    var report = req.body._REP;
    var part = req.body._P;
    axios.get("https://app.perusall.com/api/v1/courses/"+ courseId +"/assignments/"+ assignmentId +"/report/"+ report +"/" + part, config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the list of courses of the given user id in an institution from the Perusall API
const userCourseList = router.get('/user_course_list', (req,res) => {
    var courseId = req.body._CID;
    axios.get("https://app.perusall.com/api/v1/courses/" + courseId, config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the list of courses in an institution from the Perusall API
const institutionCourses = router.get('/institution_courses', (req,res) => {
    axios.get("https://app.perusall.com/api/v1/courses", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the list of assignments from the given course id in an institution from the Perusall API
const courseAssignments = router.get('/course_assignments', (req,res) => {
    var courseId = req.body._CID;
    axios.get("https://app.perusall.com/api/v1/courses/" + courseId + "/assignments", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the annotations from the course of the given course id on the assignment with the given assignment id in an institution from the Perusall API
const assignmentAnnotations = router.get('/assignment_annotations', (req,res) => {
    var courseId = req.body._CID;
    var assignmentId = req.body._AID;
    axios.get("https://app.perusall.com/api/v1/courses/" + courseId + "/assignments/" + assignmentId + "/annotations", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})