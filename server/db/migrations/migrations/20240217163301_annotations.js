/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("annotations", function(table){
        table.increments("annotationId", {primaryKey: true}).unsigned().notNullable();
        table.integer("courseId").notNullable().unique().unsigned();
        table.integer("studentId").notNullable().unique().unsigned();
        table.foreign("courseId").references("assignment.courseId");
        table.foreign("studentId").references("assignment.studentId");
        table.text("annotationText").notNullable();

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("department");
};