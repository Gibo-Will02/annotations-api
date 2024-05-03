/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const axios = require( "axios" )

exports.seed = async function(knex) {
  
  //Delete any remnants of old tables, can be removed for preservation of database
  await knex("annotations").del()
  await knex('assignment').del()
  await knex('studentCourse').del()
  await knex('course').del()
  await knex('student').del()
  await knex('department').del()

  var incoming = null;

  //Get needed API information
  const config = {
    headers: {
      "X-Institution": process.env.INSTITUTION,
      "X-API-TOKEN": process.env.TOKEN
    }
  }

  //Insert dummy department value
  await knex('department').insert([
    {
      departmentId: 0,
      departmentName: "Computer Science"
    }
  ])

  //Get all courses
  var response = await axios.get("https://app.perusall.com/api/v1/courses", config)
  var incoming = response.data

  annotationIdNumber = 0; //Needed because annotation counter resets after each assignment, course, and student
  assignmentIdNumber = 0; //Needed because assignment counter resets after each course and student
  studentIdNumber = 0; //Needed because student counter resets after each course
  
  //Loop through all courses
  for(let i = 0; i < incoming.length; i++)
  {
    //Insert into course table
    await knex('course').insert([
        {
            courseId: i,
            perusallCourseId: incoming[i]._id,
            courseName: incoming[i].name
        }
    ]);

    //Get all students in the course
    var response = await axios.get("https://app.perusall.com/api/v1/courses/" + incoming[i]._id, config)
    var incomingTwo = response.data

    //Loop through all the students in the course
    for(let j = 0; j < incomingTwo.studentIds.length; j++)
    {
      //Get specific information on the student
      var response = await axios.get("https://app.perusall.com/api/v1/users/" + incomingTwo.studentIds[j], config)
      var incomingStudent = response.data
      
      //Insert into the student table with the student information
      await knex('student').insert([
        {
            wid: studentIdNumber,
            perusallStudentId: incomingStudent._id,
            email: incomingStudent.email,
            departmentId: 0
        }
      ]);
      studentIdNumber++;

      //Create connection between students and courses
      await knex('studentCourse').insert([
        {
          studentId: j,
          courseId: i
        }
      ]);

      //Get assignments for the course
      var response = await axios.get("https://app.perusall.com/api/v1/courses/" + incoming[i]._id + "/assignments", config)
      var incomingThree = response.data

      //Loop through all assignments
      for(let k = 0; k < incomingThree.length; k++)
      {
        //Insert assignment into the table
        await knex('assignment').insert([
          {
            assignmentId: assignmentIdNumber,
            perusallAssignmentId: incomingThree[k]._id,
            assignmentName: incomingThree[k].name,
            perusallCourseId: incoming[i]._id,
            courseId: i,
            studentId: j
          }
        ]);
        

          //Get annotation information
          var response = await axios.get("https://app.perusall.com/api/v1/courses/" + incoming[i]._id + "/assignments/" + incomingThree[k]._id + "/annotations", config)
          var incomingFour = response.data
          
          //Loop through annotations
          for(let l = 0; l < incomingFour.length; l++)
          {
            //Insert into annotation table
            await knex('annotations').insert([
              {
                annotationId: annotationIdNumber,
                annotationText: incomingFour[l].plainText,
                assignmentId: assignmentIdNumber,
                perusallAnnotationId: incomingFour[l].id,
                studentId: j,
              }
            ]);
            annotationIdNumber++;
          }
          assignmentIdNumber++;
      }

    }
  }

  //await knex.select().table('annotations').then(function(rows){console.log(rows)}); //Debug line to prove that it all worked
};