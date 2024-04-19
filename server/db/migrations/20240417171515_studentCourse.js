/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("studentCourse", function(table){
    table.integer("courseId", {primaryKey: true}).unsigned().notNullable();
    table.integer("studentId", {primaryKey: true}).unsigned().notNullable();
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
    .dropTableIfExists("studentCourse");
};
