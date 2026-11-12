const con = require('../db')

const criarOcorrencia = (req, res) => {
    let { usuarioId, local, tipoResiduo, nivelRisco, data, status } = req.body
    let query = "insert into ocorrencia (usuarioId, local, tipoResiduo, nivelRisco, data, status) values (?, ?, ?, ?, ?, ?)"

    con.query(query, [usuarioId, local, tipoResiduo, nivelRisco || 'Medio', data || new Date(), status || 'Novo'], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else {
            res.status(201).json({ mensagem: "Ocorrência registrada com sucesso!", id: result.insertId })
        }
    })
}

const listarOcorrencias = (req, res) => {
    let query = `
        select o.id, o.local, o.tipoResiduo, o.nivelRisco, o.data, o.status, 
               u.id as usuarioId, u.nome as usuarioNome, u.email as usuarioEmail
        from ocorrencia o
        inner join usuario u on o.usuarioId = u.id
    `
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ erro: err.sqlMessage })
        } else {
            res.json(result)
        }
    })
}

const atualizarOcorrencia = (req, res) => {
    let { id } = req.params
    let { local, tipoResiduo, nivelRisco, data, status } = req.body
    let query = "update ocorrencia set local = ?, tipoResiduo = ?, nivelRisco = ?, data = ?, status = ? where id = ?"

    con.query(query, [local, tipoResiduo, nivelRisco, data, status, id], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ mensagem: "Ocorrência não encontrada." })
        } else {
            res.json({ mensagem: "Ocorrência atualizada com sucesso!" })
        }
    })
}

const deletarOcorrencia = (req, res) => {
    let { id } = req.params
    let query = "delete from ocorrencia where id = ?"

    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ mensagem: "Ocorrência não encontrada." })
        } else {
            res.json({ mensagem: "Ocorrência excluída com sucesso!" })
        }
    })
}

const resumoTratados = (req, res) => {
    let query = "select count(*) as totalTratados from ocorrencia where status = 'Tratado'"

    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ erro: err.sqlMessage })
        } else {
            res.json(result[0])
        }
    })
}

module.exports = {
    criarOcorrencia,
    listarOcorrencias,
    atualizarOcorrencia,
    deletarOcorrencia,
    resumoTratados
}