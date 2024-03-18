/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  await knex("annotations").del()
  await knex('assignment').del()
  await knex('course').del()
  await knex('student').del()
  await knex('department').del()

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

  // Student seeding
  await knex('student').insert([
    {
      wid: 1,
      departmentId: 1,
      notes: 'Notes 1'
    },
    {
      wid: 2,
      departmentId: 2,
      notes: 'Notes 2'
    },
    {
      wid: 3,
      departmentId: 3,
      notes: 'Notes 3'
    },
  ]);
  
  // Course seeding
  await knex('course').insert([
    {
      courseId: 1,
      studentId: 1,
      courseName: 'Course 1'
    },
    {
      courseId: 2,
      studentId: 2,
      courseName: 'Course 2'
    },
    {
      courseId: 3,
      studentId: 3,
      courseName: 'Course 3'
    },
  ]);

  // Assignment seeding
  await knex('assignment').insert([
    {
      assignmentId: 1,
      courseId: 1,
      studentId: 1
    },
    {
      assignmentId: 2,
      courseId: 2,
      studentId: 2
    },
    {
      assignmentId: 3,
      courseId: 3,
      studentId: 3
    },
  ]);

  // Annotation seeding
  await knex("annotations").insert([
    {
      annotationId: 1,
      courseId: 1,
      studentId: 1,
      annotationText: "text 1"
    },
    {
      annotationId: 2,
      courseId: 2,
      studentId: 2,
      annotationText: "text 2"
    },
    {
      annotationId: 3,
      courseId: 3,
      studentId: 3,
      annotationText: "text 3"
    },
  ]);
};
