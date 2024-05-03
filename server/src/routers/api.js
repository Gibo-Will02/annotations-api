const axios = require( "axios" )
const express = require( "express" )
const auth = require("./auth")
const loginRequired = require("../middleware/login-required")
const db = require("../../db");

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
});


//Application API call to recieve the comments from the database given a certain assignment
/**
 * @openapi
 * /api/database_test:
 *   get:
 *     summary: Get annotations from database
 *     description: Retrieves the annotations belonging to a given assignment inside of the database
 *     tags:
 *       - Database Test
 *     responses:
 *       200:
 *         description: Successful response with the database annotation data
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Resource not found.
 */
router.get('/database_test', (req, res) => {
    db.select().table('annotations').where('assignmentId', 0).then(data => {
        res.json(data);
    }).catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    });
});

//Application API call to send a get to receive the users in an institution from the Perusall API
/**
 * @openapi
 * /api/institution_roster:
 *   get:
 *     summary: Get institution roster
 *     description: Retrieves the roster of users for the institution.
 *     tags:
 *       - Institution Roster
 *     responses:
 *       200:
 *         description: Successful response with the institution roster data.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Resource not found.
 */
router.get('/institution_roster', (req, res) => {
    axios.get("https://app.perusall.com/api/v1/users", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the courses in an institution from the Perusall API
/**
 * @openapi
 * /api/course_data:
 *   post:
 *     summary: Get course data
 *     description: Retrieves the courses in the institution
 *     tags:
 *       - Course Data
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _CID:
 *                 type: string
 *                 description: Course ID
 *     responses:
 *       200:
 *         description: Successful response with the institution courses data.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Resource not found.
 */
router.post('/course_data', (req, res) => {
    var courseId = req.body._CID;
    console.log(courseId);
    axios.get("https://app.perusall.com/api/v1/courses/" + courseId, config).then((response)=>{res.json(response.data); console.log(response.data);}).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the assignment grades for a specefic assignment in an institution from the Perusall API
/**
 * @openapi
 * /api/assignment_grades:
 *   post:
 *     summary: Get assignment grades
 *     description: Retrieves the grades of a given assignment within a given course.
 *     tags:
 *       - Assignment Grades
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _CID:
 *                 type: string
 *                 description: Course ID
 *               _AID:
 *                 type: string
 *                 description: Assignment ID
 *     responses:
 *       200:
 *         description: Successful response with the assignment grades data.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Resource not found.
 */
router.post('/assignment_grades', (req, res) => {
    var courseId = req.body._CID;
    var assignmentId = req.body._AID;
    axios.get("https://app.perusall.com/api/v1/courses/"+ courseId +"/assignments/"+ assignmentId +"/scores", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the analytics based on the assignment in an institution from the Perusall API
/**
 * @openapi
 * /api/assignment_analytics:
 *   post:
 *     summary: Get assignment analytics
 *     description: Retrieves the analytics of a given assignment within a given course.
 *     tags:
 *       - Assignment Analytics
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _CID:
 *                 type: string
 *                 description: Course ID
 *               _AID:
 *                 type: string
 *                 description: Assignment ID
 *               _REP:
 *                 type: string
 *                 description: report
 *               _P:
 *                 type: string
 *                 description: part
 *     responses:
 *       200:
 *         description: Successful response with the assignment analytics data.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Resource not found.
 */
router.post('/assignment_analytics', (req, res) => {
    var courseId = req.body._CID;
    var assignmentId = req.body._AID;
    var report = req.body._REP;
    var part = req.body._P;
    axios.get("https://app.perusall.com/api/v1/courses/"+ courseId +"/assignments/"+ assignmentId +"/analytics/"+ report +"/" + part, config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the list of courses of the given user id in an institution from the Perusall API
/**
 * @openapi
 * /api/user_course_list:
 *   post:
 *     summary: Get user course list
 *     description: Retrieves the list of users within a given course.
 *     tags:
 *       - User Course List
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _UID:
 *                 type: string
 *                 description: User ID
 *     responses:
 *       200:
 *         description: Successful response with the user course list data.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Resource not found.
 */
router.post('/user_course_list', (req,res) => {
    var userId = req.body._UID
    axios.get("https://app.perusall.com/api/v1/users/" + userId, config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the list of courses in an institution from the Perusall API
/**
 * @openapi
 * /api/institution_courses:
 *   get:
 *     summary: Get institution courses
 *     description: Retrieves the courses of the institution.
 *     tags:
 *       - Institution Courses
 *     responses:
 *       200:
 *         description: Successful response with the institution courses data.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Resource not found.
 */
router.get('/institution_courses', (req,res) => {
    axios.get("https://app.perusall.com/api/v1/courses/", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the list of assignments from the given course id in an institution from the Perusall API
/**
 * @openapi
 * /api/course_assignments:
 *   post:
 *     summary: Get course assignments
 *     description: Retrieves the list of assignments within a given course.
 *     tags:
 *       - Course Assignments
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _CID:
 *                 type: string
 *                 description: Course ID
 *     responses:
 *       200:
 *         description: Successful response with the list of course assignments data.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Resource not found.
 */
router.post('/course_assignments', (req,res) => {
    var courseId = req.body._CID;
    axios.get("https://app.perusall.com/api/v1/courses/" + courseId + "/assignments", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})
  
//Application API call to send a get to receive the annotations from the course of the given course id on the assignment with the given assignment id in an institution from the Perusall API
/**
 * @openapi
 * /api/assignment_annotations:
 *   post:
 *     summary: Get Assignment Annotations
 *     description: Retrieves the annotations of a given assignment within a given course.
 *     tags:
 *       - Assignment Annotations
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _CID:
 *                 type: string
 *                 description: Course ID
 *               _AID:
 *                 type: string
 *                 description: Assignment ID
 *     responses:
 *       200:
 *         description: Successful response with the assignment annotation data.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: Resource not found.
 */
router.post('/assignment_annotations', (req,res) => {
    var courseId = req.body._CID;
    var assignmentId = req.body._AID;
    // axios.get("https://app.perusall.com/api/v1/courses/" + courseId + "/assignments/" + assignmentId + "/annotations", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
    db.select(
        'annotations.perusallAnnotationId',
        'annotations.annotationText',
        'course.courseName',
        'assignment.assignmentName',
        'student.email'
    )
    .from('annotations')
    .join('assignment', 'annotations.assignmentId', '=', 'assignment.assignmentId')
    .join('course', 'assignment.courseId', '=', 'course.courseId')
    .join('student', 'annotations.studentId', '=', 'student.wid')
    .where('course.perusallCourseId', courseId)
    .andWhere('assignment.perusallAssignmentId', assignmentId).then(data => {
            res.json(data);
        }).catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        });
})

// exports the router
module.exports = router;