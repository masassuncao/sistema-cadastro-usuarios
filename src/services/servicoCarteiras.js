const mq = require('./servicoMQ')

// Importa o módulo dotenv
const env = require('dotenv').config()
const {NOME_FILA_CRIAR_CARTEIRA: FILA_CRIAR_CARTEIRA} = process.env
const {NOME_FILA_EXCLUIR_CARTEIRA: FILA_EXCLUIR_CARTEIRA} = process.env

function criarCarteira (idUsuario) {
    mq.sendToQueue(FILA_CRIAR_CARTEIRA, JSON.stringify(idUsuario));
    console.log("Criando carteira para usuário " + idUsuario)
}

function excluirCarteira (idUsuario) {
    mq.sendToQueue(FILA_EXCLUIR_CARTEIRA, JSON.stringify(idUsuario));
    console.log("Excluindo carteira do usuário " + idUsuario)
}

module.exports = {
    criarCarteira,
    excluirCarteira
}