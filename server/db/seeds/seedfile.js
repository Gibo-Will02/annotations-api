/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const axios = require( "axios" )

exports.seed = async function(knex) {
  
  await knex("annotations").del()
  await knex('assignment').del()
  await knex('course').del()
  await knex('student').del()
  await knex('department').del()

  var incoming = null;

  const config = { //put into router file
    headers: {
      "X-Institution": process.env.INSTITUTION,
      "X-API-TOKEN": process.env.TOKEN
    }
  }

  await axios.get("https://app.perusall.com/api/v1/users", config).then((response)=>{incoming=response.data}).catch((err)=>console.error(err));

  // Department seeding
  await knex('department').insert([
    {
      departmentId: 1, 
      departmentName: 'Computer Science'
    },
    {
      departmentId: 2,
      departmentName: 'Computer Engineering'
    },
    {
      departmentId: 3, 
      departmentName: 'Electrical Engineering'
    }
  ]);

  
  var response = await axios.get("https://app.perusall.com/api/v1/users", config)
  
  var incoming = response.data

  // Student seeding
  await knex('student').insert([
    {
      wid: 0,
      perusalStudentId: incoming[0]._id,
      departmentId: 1,
      notes: 'Placeholder 2',
      email: incoming[0].email
    },
    {
      wid: 1,
      perusalStudentId: incoming[1]._id,
      departmentId: 2,
      notes: 'Notes 2',
      email: incoming[1].email
    },
    {
      wid: 2,
      perusalStudentId: incoming[2]._id,
      departmentId: 3,
      notes: 'Notes 3',
      email: incoming[2].email
    },
  ]);

  var tempStudent = incoming[0]._id;

  var response = await axios.get("https://app.perusall.com/api/v1/courses", config)
  
  var incoming = response.data
  
  // Course seeding
  await knex('course').insert([
    {
      courseId: 0,
      perusalCourseId: incoming[0]._id,
      courseName: incoming[0].name
    },
    {
      courseId: 1,
      perusalCourseId: incoming[1]._id,
      courseName: incoming[1].name
    },
  ]);

  var tempCourse = incoming[0]._id;

  var stringToSend = "https://app.perusall.com/api/v1/" + tempCourse.toString() + "courses/<courseId>/assignments";

  var response = await axios.get(stringToSend, config)
  
  var incoming = response.data

  // Assignment seeding
  await knex('assignment').insert([
    {
      assignmentId: 0,
      perusalAssignmentId: "incoming[0]._id",
      assignmentName: "incoming[0].name,",
      courseId: 0,
      studentId: 0
    },
    {
      assignmentId: 1,
      perusalAssignmentId: "incoming[1]._id",
      assignmentName: "incoming[1].name",
      courseId: 1,
      studentId: 1
    },
  ]);

  var tempAssignment = incoming[0]._id;
  //stringToSend = "https://app.perusall.com/api/v1/courses/" + tempCourse.toString() + "/assignments/" + tempAssignment.toString() + "/annotations";

  //var response = await axios.get(stringToSend, config)
  
  //var incoming = response.data

  // Annotation seeding
  await knex("annotations").insert([
    {
      annotationId: 0,
      perusalAnnotationId: "incoming[0]._id",
      courseId: 0,
      studentId: 0,
      annotationText: "incoming[0].text"
    },
  ]);
};
