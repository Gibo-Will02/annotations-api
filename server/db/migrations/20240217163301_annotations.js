/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * Creates annotations table
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("annotations", function(table){
        table.increments("annotationId", {primaryKey: true}).unsigned().notNullable();
        table.text("perusallAnnotationId")
        table.integer("studentId").notNullable().unsigned();
        table.foreign("studentId").references("student.wid");
        table.text("annotationText").notNullable();

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * Drops annotations table
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("annotations");
};