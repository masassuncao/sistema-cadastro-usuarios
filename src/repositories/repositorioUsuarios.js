const knexConfig = require('../../knexfile.js')[process.env.ENV_DEPLOY || 'development']
const knex = require('knex')(knexConfig)
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');

function incluirNovoUsuario(novoUsuario) {
        novoUsuario.id = uuidv4();
        novoUsuario.senha = bcrypt.hashSync(novoUsuario.senha, 8)
        return knex('usuarios')
                .insert({...novoUsuario})
                .returning('id')
}

function buscarUsuarioPorId(id) {
        return knex('usuarios')
                .where({id: id})
}

function buscarUsuarioPorLogin(login) {
        return knex('usuarios')
                .where({login: login})
}

function alterarUsuarioPorId(id, usuarioComAlteracao) {
        usuarioComAlteracao.senha = bcrypt.hashSync(usuarioComAlteracao.senha, 8)
        return knex('usuarios')
                .where({id: id})
                .update(usuarioComAlteracao)
}

function alterarUsuarioPorLogin(login, usuarioComAlteracao) {
        usuarioComAlteracao.senha = bcrypt.hashSync(usuarioComAlteracao.senha, 8)
        return knex('usuarios')
                .where({login: login})
                .update(usuarioComAlteracao)
}

function excluirUsuarioPorId(id) {
        return knex('usuarios')
                .where({id: id})
                .returning('id')
                .del()
}

function excluirUsuarioPorLogin(login) {
        return knex('usuarios')
                .where({login: login})
                .returning('id')
                .del()
}

module.exports = {
        incluirNovoUsuario,
        buscarUsuarioPorId,
        buscarUsuarioPorLogin,
        alterarUsuarioPorId,
        alterarUsuarioPorLogin,
        excluirUsuarioPorLogin,
        excluirUsuarioPorId
}