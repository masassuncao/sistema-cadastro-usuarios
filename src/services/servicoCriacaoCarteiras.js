const mq = require('./servicoMQ')

function criarCarteira (idUsuario) {
    mq.sendToQueue("filaCriarCarteiras", JSON.stringify(idUsuario));
    console.log("Criando carteira para usuário " + idUsuario)
}

module.exports = {
    criarCarteira
}