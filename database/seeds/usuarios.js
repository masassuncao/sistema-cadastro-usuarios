const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').del()
  await knex('usuarios').insert([
    {nome: "Usuário Padrão", login: "user", email: "usuario@abc.com", senha: bcrypt.hashSync("1234", 8), papel: "USER"},
    {nome: "Administrador do Sistema", login: "admin", email: "admin@abc.com", senha: bcrypt.hashSync("1234", 8), papel: "ADMIN"},
  ]);
};
