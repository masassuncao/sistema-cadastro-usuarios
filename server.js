// Importa o módulo do Express Framework
const express = require('express')
const cors = require('cors');
const app = express()

// Importa o módulo dotenv
const env = require('dotenv').config()

app.use(cors({
    origin: '*'
}));

// Importa os módulos para tratamento das rotas
const apiRotasV1 = require('./src/routes/rotasV1')
const apiRotasSeg = require('./src/routes/rotasSeguranca')

// API versao 1 - Usuários
app.use('/api/v1', apiRotasV1)

// API com segurança versao 1
app.use('/api/seg', apiRotasSeg)

// Inicializa o servidor HTTP na porta especificada
const {APP_PORT: PORT} = process.env
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}...`)
    console.log(`Use ctrl + c para parar o servidor.`)
})