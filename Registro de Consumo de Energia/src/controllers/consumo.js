const con = require('../db')

// [RF003] Criar Registro de Consumo (Create)
const criarConsumo = (req, res) => {
    let { usuarioId, local, equipamento, consumoKwh, mesReferencia, status } = req.body
    let query = "insert into consumo (usuarioId, local, equipamento, consumoKwh, mesReferencia, status) values (?, ?, ?, ?, ?, ?)"

    con.query(query, [usuarioId, local, equipamento, consumoKwh, mesReferencia, status || 'Baixo'], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else {
            res.status(201).json({ mensagem: "Registro de consumo cadastrado com sucesso!", id: result.insertId })
        }
    })
}

// [RF003] Listar Registros de Consumo (Read)
const listarConsumo = (req, res) => {
    let query = `
        select c.id, c.local, c.equipamento, c.consumoKwh, c.mesReferencia, c.status,
               u.id as usuarioId, u.nome as usuarioNome, u.email as usuarioEmail
        from consumo c
        inner join usuario u on c.usuarioId = u.id
    `
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ erro: err.sqlMessage })
        } else {
            res.json(result)
        }
    })
}

// [RF003] Atualizar Registro de Consumo (Update)
const atualizarConsumo = (req, res) => {
    let { id } = req.params
    let { local, equipamento, consumoKwh, mesReferencia, status } = req.body
    let query = "update consumo set local = ?, equipamento = ?, consumoKwh = ?, mesReferencia = ?, status = ? where id = ?"

    con.query(query, [local, equipamento, consumoKwh, mesReferencia, status, id], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ mensagem: "Registro de consumo não encontrado." })
        } else {
            res.json({ mensagem: "Registro de consumo atualizado com sucesso!" })
        }
    })
}

// [RF003] Deletar Registro de Consumo (Delete)
const deletarConsumo = (req, res) => {
    let { id } = req.params
    let query = "delete from consumo where id = ?"

    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ mensagem: "Registro de consumo não encontrado." })
        } else {
            res.json({ mensagem: "Registro excluído com sucesso!" })
        }
    })
}

// [RF004] Resumo contendo a média de consumo de energia em kWh
const resumoMediaConsumo = (req, res) => {
    let query = "select avg(consumoKwh) as mediaConsumoKwh from consumo"

    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ erro: err.sqlMessage })
        } else {
            res.json(result[0])
        }
    })
}

module.exports = {
    criarConsumo,
    listarConsumo,
    atualizarConsumo,
    deletarConsumo,
    resumoMediaConsumo
}