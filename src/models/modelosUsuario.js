const z = require("zod")

const modeloUsuario = z.object({
    nome: z.string(),
    login: z.string(),
    senha: z.string(),
    email: z.string(),
    papel: z.string().nullable().default("USER")
})

const modeloAdministrador = z.object({
    nome: z.string(),
    login: z.string(),
    senha: z.string(),
    email: z.string(),
    papel: z.string().nullable().default("ADMIN")
})

module.exports = {
    modeloUsuario,
    modeloAdministrador
}