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
                        jwt.sign(
                            {id: usuario.id, papel: usuario.papel}, 
                            process.env.SECRET_KEY,
                            {algorithm: "HS256", expiresIn: "1h"},
                            (err, token) => {
                                if (err)
                                    res.status(500).json({mensagem: `Erro ao gerar token: ${err.message}`})
                                else
                                    res.status(200).json({token: token})
                            }
                        )
                    }
                    else
                        res.status(401).json({mensagem: `Usuário ou senha incorretos!`})
                        
                })
            }
        })

}

module.exports = {
    efetuarLoginUsuario
}