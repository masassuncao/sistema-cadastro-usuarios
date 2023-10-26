// Importa o módulo repositório de usuários
const repositorioUsuarios = require('../repositories/repositorioUsuarios')

// Importa o módulo modelo de usuario
const modelosUsuario = require('../models/modelosUsuario')

// Importa o módulo serviço de criação de carteiras
const servicoCarteiras = require('../services/servicoCarteiras')

function incluirUsuario(req, res) {
    try {
        const modelo = modelosUsuario.modeloUsuario
        const dadosUsuarioInserir = req.body

        //Verifica o perfil de usuário:
        if (!validaPapelUsuario(dadosUsuarioInserir)) {
            return res.status(400).json({status: "NOK", mensagem: `Falha na requisição: Perfil não permitido.`})
        }

        //Se o perfil estiver de acordo com a rota utilizada, faz a inclusão:
        repositorioUsuarios.incluirNovoUsuario(modelo.parse(dadosUsuarioInserir))
        .then((usuarios) => {
            console.log('Usuário inserido: ' + usuarios[0].id)
            servicoCarteiras.criarCarteira(usuarios[0].id)
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

function obterUsuarioEspecifico(req, res) {
    const idUsuarioBuscado = (req.params.id)
    const idUsuarioRequisicao = req.headers['user-id']
    if (idUsuarioBuscado === idUsuarioRequisicao){
        repositorioUsuarios.buscarUsuarioPorId(idUsuarioBuscado)
            .then(usuarios => {
                if (usuarios.length) {
                    let usuarioSemSenha = usuarios[0]
                    usuarioSemSenha.senha = '******'
                    return res.status(200).json(usuarioSemSenha)
                }
                return res.status(404).json({status: "NOK", mensagem: "Usuário não localizado."})
            })
            .catch(err => {
                return res.status(500).json({status: "NOK", mensagem: `Erro ao recuperar registro do banco de dados: ${err.message}`})
            })
    } else {
        return res.status(403).json({status: "NOK", mensagem: `Permissão negada: Este usuário não tem permissão para acessar os dados de outros usuários.`})
    }
    
}

function alterarUsuario(req, res) {
    const modelo = modelosUsuario.modeloUsuario
    const dadosUsuarioAlterar = req.body
    const idUsuarioAlterar = (req.params.id)
    const idUsuarioRequisicao = req.headers['user-id']
    
    //Verifica o perfil de usuário:
    if (!validaPapelUsuario(dadosUsuarioAlterar)) {
        return res.status(400).json({status: "NOK", mensagem: `Falha na requisição: Perfil não permitido.`})
    }
    
    //Se o perfil estiver de acordo com a rota utilizada, faz a alteração:
    if (idUsuarioAlterar === idUsuarioRequisicao) {
            try {
                const modelo = modelosUsuario.modeloUsuario
                repositorioUsuarios.alterarUsuarioPorId(idUsuarioAlterar, modelo.parse(dadosUsuarioAlterar))
                    .then(usuarios => {
                        if (usuarios) {
                            return res.status(200).json({status: "OK", mensagem: "Usuário alterado com sucesso!"})
                        }
                        return res.status(404).json({status: "NOK", mensagem: "Usuário não cadastrado."})
                    })
                    .catch(err => {
                        return res.status(500).json({status: "NOK", mensagem: `Erro ao alterar registro no banco de dados: ${err.message}`})
                    })
        } catch(e) {
            return res.status(400).json({status: "NOK", mensagem: "Falha ao alterar usuário: ", erros: e.errors})
        }
    } else {
        return res.status(403).json({status: "NOK", mensagem: `Permissão negada: Este usuário não tem permissão para alterar perfis de outros usuários.`})
    }
}

function excluirUsuario(req, res) {
    const idUsuarioDeletar = req.params.id
    const idUsuarioRequisicao = req.headers['user-id']
    if (idUsuarioDeletar === idUsuarioRequisicao){
        repositorioUsuarios.excluirUsuarioPorId(idUsuarioDeletar)
        .then(usuarios => {
            if (usuarios) {
                servicoCarteiras.excluirCarteira(idUsuarioDeletar)
                return res.status(200).json({status: "OK", mensagem: "Usuário excluído com sucesso!"})
            } else {
                return res.status(404).json({status: "NOK", mensagem: "Usuário não cadastrado."})        
            }
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao excluir registro no banco de dados: ${err.message}`})
        })
    } else {
        return res.status(403).json({status: "NOK", mensagem: `Permissão negada: Este usuário não tem permissão para excluir perfis de outros usuários.`})
    }
}

function validaPapelUsuario(usuario) {
    papelUsuario = usuario.papel
    if ((papelUsuario === "USER" || papelUsuario == null)) {
        return true
    }
    return false
}

module.exports = {
    alterarUsuario,
    excluirUsuario,
    incluirAdministrador,
    incluirUsuario,
    obterUsuarioEspecifico
}