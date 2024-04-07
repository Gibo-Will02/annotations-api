/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("course", function(table){
        table.increments("courseId", {primaryKey: true}).unsigned().notNullable();
        table.text("perusalCourseId").notNullable();
        table.text("courseName").notNullable();

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("course");
};