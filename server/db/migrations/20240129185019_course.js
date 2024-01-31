/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("course", function(table){
        table.increments("courseId", {primaryKey: true}).unsigned().notNullable();
        table.integer("studentId").unsigned().notNullable().unique();
        table.foreign("studentId").references("student.wid");
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
