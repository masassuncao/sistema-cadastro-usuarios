const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Importa o módulo repositório de usuarios
const repositorioUsuarios = require('../repositories/repositorioUsuarios')

function efetuarLoginUsuario(req, res) {
    const {login, senha} = req.body
    repositorioUsuarios.buscarUsuarioPorLogin(login)
        .then(usuarios => {
            if (!usuarios.length)
                res.status(401).json({mensagem: `Usuário ou senha incorretos!`})
            else {
                let usuario = usuarios[0]
                bcrypt.compare(senha, usuario.senha, (err, result) => {
                    if (err)
                        res.status(500).json({mensagem: `Erro ao comparar senhas: ${err.message}`})
                    else if (result) {
                        var id_usuario = usuario.id
                        var usuarioSecretKey = obtemSecretKey(id_usuario)
                        jwt.sign(
                            {id: id_usuario, papel: usuario.papel}, 
                            usuarioSecretKey,
                            {algorithm: "HS256", expiresIn: "1h"},
                            (err, token) => {
                                if (err)
                                    res.status(500).json({mensagem: `Erro ao gerar token: ${err.message}`})
                                else
                                    res.status(200).json({id: id_usuario, token: token})
                            }
                        )
                    }
                    else
                        res.status(401).json({mensagem: `Usuário ou senha incorretos!`})
                        
                })
            }
        })

}

function obtemSecretKey(id) {
    return process.env.SECRET_KEY.concat(id)
}

module.exports = {
    efetuarLoginUsuario,
    obtemSecretKey
}