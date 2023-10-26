const mq = require('./servicoMQ')

function criarCarteira (idUsuario) {
    mq.sendToQueue("filaCriarCarteiras", JSON.stringify(idUsuario));
    console.log("Criando carteira para usuário " + idUsuario)
}

function excluirCarteira (idUsuario) {
    mq.sendToQueue("filaExcluirCarteiras", JSON.stringify(idUsuario));
    console.log("Excluindo carteira do usuário " + idUsuario)
}

module.exports = {
    criarCarteira,
    excluirCarteira
}