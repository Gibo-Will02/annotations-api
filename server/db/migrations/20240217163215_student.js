/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("student", function(table){
        table.increments("wid", {primaryKey: true}).unsigned().notNullable();
        table.text("perusallStudentId").notNullable();
        table.integer("departmentId").unsigned().notNullable();
        table.foreign("departmentId").references("department.departmentId");
        table.text("email").unique().notNullable();
        table.text("notes").defaultTo("");

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("student");
};