/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments ('id')
    table.text ("nome", 255).unique().notNullable()
    table.text ("login", 100).unique().notNullable()
    table.text ("email", 100).notNullable()
    table.text ("senha", 100).notNullable()
    table.text ("papel", 200).notNullable()
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists ('usuarios')
};
