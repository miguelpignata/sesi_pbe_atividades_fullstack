const express = require("express")
const router = express.Router()

const UsuarioController = require("./controllers/usuario")
const ConsumoController = require("./controllers/consumo")

// Rota Inicial
router.get('/', (req, res) => {
    res.json("Back-end de Gestão de Consumo Energético respondendo!")
})

// Rotas de Usuário [RF001] & [RF002]
router.post('/usuarios', UsuarioController.criarUsuario)
router.get('/usuarios', UsuarioController.listarUsuarios)
router.put('/usuarios/:id', UsuarioController.atualizarUsuario)
router.delete('/usuarios/:id', UsuarioController.deletarUsuario)
router.post('/login', UsuarioController.login)

// Rotas de Consumo [RF003] & [RF004]
router.post('/consumos', ConsumoController.criarConsumo)
router.get('/consumos', ConsumoController.listarConsumo)
router.put('/consumos/:id', ConsumoController.atualizarConsumo)
router.delete('/consumos/:id', ConsumoController.deletarConsumo)
router.get('/consumos/resumo/media', ConsumoController.resumoMediaConsumo)

module.exports = router