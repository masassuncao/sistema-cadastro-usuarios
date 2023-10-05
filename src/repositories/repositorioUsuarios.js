const knexConfig = require('../../knexfile.js')[process.env.ENV || 'development']
const knex = require('knex')(knexConfig)
const bcrypt = require('bcryptjs')

function buscarUsuarioPorLogin(login) {
        return knex('usuarios')
                .where({login: login})
}

function incluirNovoUsuario(novoUsuario) {
        novoUsuario.senha = bcrypt.hashSync(novoUsuario.senha, 8)
        return knex('usuarios').insert({...novoUsuario})
}

function excluirUsuarioPorLogin(login) {
        return knex('usuarios')
                .where({login: login})
                .returning('id')
                .del()
}

module.exports = {
        buscarUsuarioPorLogin,
        incluirNovoUsuario,
        excluirUsuarioPorLogin
}