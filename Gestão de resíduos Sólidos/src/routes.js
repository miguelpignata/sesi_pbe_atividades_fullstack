const express = require("express")
const router = express.Router()
const UsuarioController = require("./controllers/usuario")
const OcorrenciaController = require("./controllers/ocorrencia")

router.get('/', (req, res) => {
    res.json("Back-end respondendo!")
})

router.post('/usuarios', UsuarioController.criarUsuario)
router.get('/usuarios', UsuarioController.listarUsuarios)
router.put('/usuarios/:id', UsuarioController.atualizarUsuario)
router.delete('/usuarios/:id', UsuarioController.deletarUsuario)
router.post('/login', UsuarioController.login)

router.post('/ocorrencias', OcorrenciaController.criarOcorrencia)
router.get('/ocorrencias', OcorrenciaController.listarOcorrencias)
router.put('/ocorrencias/:id', OcorrenciaController.atualizarOcorrencia)
router.delete('/ocorrencias/:id', OcorrenciaController.deletarOcorrencia)
router.get('/ocorrencias/resumo/tratados', OcorrenciaController.resumoTratados)

module.exports = router