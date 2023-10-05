const express = require('express')

const controladoraUsuarios = require('../controllers/controladoraUsuarios')
const {checkToken, isAdmin} = require('./rotasSeguranca')

const rotasV1 = express.Router()

// Gera log das requisições
rotasV1.use(
    (req, res, next) => {
        console.log(new Date().toLocaleString(), "-", req.ip, "-", req.method, req.url)
        next()
    }
)

// Configurações das rotas
rotasV1.use(express.json())
rotasV1.use(express.urlencoded({extended: true}))

rotasV1.get('/', function(req, res){
    res.sendFile('index.html', { root: '.' })
})

//Rotas de usuários
rotasV1.post('/usuarios/', controladoraUsuarios.incluirUsuario)
rotasV1.post('/administradores/', checkToken, isAdmin, controladoraUsuarios.incluirAdministrador)
rotasV1.delete('/usuarios/', checkToken, isAdmin, controladoraUsuarios.excluirUsuario)

rotasV1.use(
    (req, res) => {
        res.statusCode = 404
        res.send('Página não encontrada!')
    }
)

module.exports = rotasV1