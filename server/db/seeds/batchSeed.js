/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const axios = require( "axios" )

exports.seed = async function(knex) {
  
  await knex("annotations").del()
  await knex('assignment').del()
  await knex('studentCourse').del()
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

  await knex('department').insert([
    {
      departmentId: 0,
      departmentName: "Computer Science"
    }
  ])

  var response = await axios.get("https://app.perusall.com/api/v1/courses", config)
  var incoming = response.data

  annotationIdNumber = 0; //Needed because annotation counter resets after each assignment, course, and student
  assignmentIdNumber = 0; //Needed because assignment counter resets after each course and student
  studentIdNumber = 0; //Needed because student counter resets after each course
  
  for(let i = 0; i < incoming.length; i++)
  {
    
    await knex('course').insert([
        {
            courseId: i,
            perusallCourseId: incoming[i]._id,
            courseName: incoming[i].name
        }
    ]);

    var response = await axios.get("https://app.perusall.com/api/v1/courses/" + incoming[i]._id, config)
    var incomingTwo = response.data

    for(let j = 0; j < incomingTwo.studentIds.length; j++)
    {
      var response = await axios.get("https://app.perusall.com/api/v1/users/" + incomingTwo.studentIds[j], config)
      var incomingStudent = response.data
      
      await knex('student').insert([
        {
            wid: studentIdNumber,
            perusallStudentId: incomingStudent._id,
            email: incomingStudent.email,
            departmentId: 0
        }
      ]);
      studentIdNumber++;

      await knex('studentCourse').insert([
        {
          studentId: j,
          courseId: i
        }
      ]);

      var response = await axios.get("https://app.perusall.com/api/v1/courses/" + incoming[i]._id + "/assignments", config)
      var incomingThree = response.data

      for(let k = 0; k < incomingThree.length; k++)
      {
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
        assignmentIdNumber++;

          var response = await axios.get("https://app.perusall.com/api/v1/courses/" + incoming[i]._id + "/assignments/" + incomingThree[k]._id + "/annotations", config)
          var incomingFour = response.data
          
          for(let l = 0; l < incomingFour.length; l++)
          {
            await knex('annotations').insert([
              {
                annotationId: annotationIdNumber,
                perusallAnnotationId: incomingFour[l].id,
                courseId: i,
                studentId: j,
                annotationText: incomingFour[l].plainText
              }
            ]);
            annotationIdNumber++;
          }
      }

    }
  }

  //await knex.select().table('annotations').then(function(rows){console.log(rows)});
};