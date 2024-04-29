/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * Creates assignment table
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("assignment", function(table){
        table.increments("assignmentId", {primaryKey: true}).unsigned().notNullable();
        table.text("perusallAssignmentId").notNullable();
        table.text("assignmentName").notNullable();
        table.text("perusallCourseId").notNullable();
        table.integer("courseId").notNullable().unsigned();
        table.integer("studentId").notNullable().unsigned();
        table.foreign("courseId").references("course.courseId");
        table.foreign("studentId").references("student.wid");

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * Drops assignment table
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("assignment");
};