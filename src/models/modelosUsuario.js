const z = require("zod")

const modeloAdministrador = z.object({
    nome: z.string().min(10, "Mínimo de 10 caracteres."),
    login: z.string().min(6, "Mínimo de 6 caracteres."),
    senha: z.string().min(6, "Mínimo de 6 caracteres."),
    email: z.string().email(),
    papel: z.string().nullable().default("ADMIN")
})

const modeloUsuario = z.object({
    nome: z.string().min(10, "Mínimo de 10 caracteres."),
    login: z.string().min(6, "Mínimo de 6 caracteres."),
    senha: z.string().min(6, "Mínimo de 6 caracteres."),
    email: z.string().email(),
    papel: z.string().nullable().default("USER")
})

module.exports = {
    modeloAdministrador,
    modeloUsuario
}