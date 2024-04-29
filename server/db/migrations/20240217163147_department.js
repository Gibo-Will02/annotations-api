/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * Creates department table
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("department", function(table){
        table.increments("departmentId", {primaryKey: true}).unsigned().notNullable();
        table.text("departmentName").notNullable().unique();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * Drops department table
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("department");
};