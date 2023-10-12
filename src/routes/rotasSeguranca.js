const express = require('express')
const jwt = require('jsonwebtoken')
const rotasSeg = express.Router()
const controladoraSeg = require('../controllers/controladoraSeg')

// Gera log das requisições
rotasSeg.use(
    (req, res, next) => {
        console.log(new Date().toLocaleString(), "-", req.ip, "-", req.method, req.url)
        next()
    }
)

// Configurações das rotas
rotasSeg.use(express.json())

rotasSeg.post('/login/', controladoraSeg.efetuarLoginUsuario)

rotasSeg.use(
    (req, res) => {
        res.statusCode = 404
        res.send('Página não encontrada!')
    }
)

rotasSeg.checkToken = (req, res, next) => {
    const autHeader = req.headers['authorization']
    const id_usuario = req.headers['user-id']
    const token = autHeader && autHeader.split(' ')[1]

    if (!token)
        res.status(401).json({mensagem: `Token não informado!`})
    else {
        let secret = controladoraSeg.obtemSecretKey(id_usuario)
        jwt.verify(token, secret, (err, decoded) => {
            if (err)
                res.status(401).json({mensagem: `Token inválido!`})
            else
                req.userId = decoded.id
                req.roles = decoded.papel
                next()
        })
    }
}

rotasSeg.isAdmin = (req, res, next) => {
    if (!req.roles.includes('ADMIN'))
        res.status(403).json({mensagem: `Permissão negada.`})
    else
        next()
}

module.exports = rotasSeg