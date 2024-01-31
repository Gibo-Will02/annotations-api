/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("assignment", function(table){
        table.increments("assignmentId", {primaryKey: true}).unsigned().notNullable();
        table.integer("courseId").notNullable().unique().unsigned();
        table.integer("studentId").notNullable().unique().unsigned();
        table.foreign("courseId").references("course.courseId");
        table.foreign("studentId").references("student.wid");

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("assignment");
};
