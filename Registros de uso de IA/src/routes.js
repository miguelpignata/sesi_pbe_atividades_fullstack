const express = require("express")
const router = express.Router()

const UsuarioController = require("./controllers/usuario")
const UsoIaController = require("./controllers/usoia")

router.get('/', (req, res) => {
    res.json("Back-end de Registros de Uso de IA respondendo!")
})

router.post('/usuarios', UsuarioController.criarUsuario)
router.get('/usuarios', UsuarioController.listarUsuarios)
router.put('/usuarios/:id', UsuarioController.atualizarUsuario)
router.delete('/usuarios/:id', UsuarioController.deletarUsuario)
router.post('/login', UsuarioController.login)

router.post('/usosia', UsoIaController.criarUsoIa)
router.get('/usosia', UsoIaController.listarUsoIa)
router.put('/usosia/:id', UsoIaController.atualizarUsoIa)
router.delete('/usosia/:id', UsoIaController.deletarUsoIa)
router.get('/usosia/resumo/riscos', UsoIaController.resumoRiscos)

module.exports = router