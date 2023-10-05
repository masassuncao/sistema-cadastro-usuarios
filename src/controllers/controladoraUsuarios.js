// Importa o módulo repositório de usuários
const repositorioUsuarios = require('../repositories/repositorioUsuarios')

// Importa o módulo modelo de usuario
const modelosUsuario = require('../models/modelosUsuario')

function incluirUsuario(req, res) {
    try {
        const modelo = modelosUsuario.modeloUsuario
        const dadosUsuarioInserir = req.body

        //Verifica o perfil de usuário:
        if (!(dadosUsuarioInserir.papel === "USER" || dadosUsuarioInserir.papel == null)) {
            return res.status(400).json({status: "NOK", mensagem: `Falha na requisição: Perfil não permitido.`})
        }

        //Se o perfil estiver de acordo com a rota utilizada, faz a inclusão:
        repositorioUsuarios.incluirNovoUsuario(modelo.parse(dadosUsuarioInserir))
        .then(usuarios => {
            return res.status(200).json({status: "OK", mensagem: "Usuário inserido com sucesso!"})
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao inserir registro no banco de dados: ${err.message}`})
        })
    } catch (e) {
        return res.status(400).json({status: "NOK", mensagem: "Falha ao inserir usuário: ", erros: e.errors})
    }
}

function incluirAdministrador(req, res) {
    try {
        const modelo = modelosUsuario.modeloAdministrador
        const dadosUsuarioInserir = req.body

        //Verifica o perfil de administrador:
        if (!(dadosUsuarioInserir.papel === "ADMIN" || dadosUsuarioInserir.papel == null)) {
            return res.status(400).json({status: "NOK", mensagem: `Falha na requisição: Perfil não permitido.`})
        }

        //Se o perfil estiver de acordo com a rota utilizada, faz a inclusão:
        repositorioUsuarios.incluirNovoUsuario(modelo.parse(dadosUsuarioInserir))
        .then(usuarios => {
            return res.status(200).json({status: "OK", mensagem: "Usuário inserido com sucesso!"})
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao inserir registro no banco de dados: ${err.message}`})
        })
    } catch (e) {
        return res.status(400).json({status: "NOK", mensagem: "Falha ao inserir usuário: ", erros: e.errors})
    }
}

function excluirUsuario(req, res) {
    const dadosUsuarioDeletar = req.body

    repositorioUsuarios.excluirUsuarioPorLogin(dadosUsuarioDeletar.login)
    .then(usuarios => {
        if (usuarios) {
            return res.status(200).json({status: "OK", mensagem: "Usuário excluído com sucesso!"})
        } else {
            return res.status(404).json({status: "NOK", mensagem: "Usuário não cadastrado."})        
        }
    })
    .catch(err => {
        return res.status(500).json({status: "NOK", mensagem: `Erro ao excluir registro no banco de dados: ${err.message}`})
    })
}

module.exports = {
    incluirAdministrador,
    incluirUsuario,
    excluirUsuario
}