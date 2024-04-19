/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("annotations", function(table){
        table.increments("annotationId", {primaryKey: true}).unsigned().notNullable();
        table.text("perusallAnnotationId")
        table.integer("courseId").notNullable().unsigned();
        table.integer("studentId").notNullable().unsigned();
        table.foreign("courseId").references("course.courseId");
        table.foreign("studentId").references("student.wid");
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
        .dropTableIfExists("annotations");
};