/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * Creates course table
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("course", function(table){
        table.increments("courseId", {primaryKey: true}).unsigned().notNullable();
        table.text("perusallCourseId").unique().notNullable();
        table.text("courseName").notNullable();

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * Drops course table
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("course");
};