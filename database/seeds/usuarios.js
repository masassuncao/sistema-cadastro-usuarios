const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').del()
  await knex('usuarios').insert([
    {id: "03c43d4b-b27e-44f3-a771-3cec26f34c9d", nome: "Usuário Padrão", login: "user", email: "usuario@abc.com", senha: bcrypt.hashSync("1234", 8), papel: "USER"},
    {id: "5aff4567-d368-4cc4-a322-c9413fab0ee8", nome: "Administrador do Sistema", login: "admin", email: "admin@abc.com", senha: bcrypt.hashSync("1234", 8), papel: "ADMIN"},
  ]);
};
