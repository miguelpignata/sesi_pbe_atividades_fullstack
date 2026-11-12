const con = require('../db')

const criarUsoIa = (req, res) => {
    let { usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana } = req.body
    let query = "insert into usoia (usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana) values (?, ?, ?, ?, ?, ?, ?)"

    con.query(query, [usuarioId, sistema, tipo || 'Empresa', finalidade, tecnologia, nivelRisco || 'Baixo', revisaoHumana ?? true], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else {
            res.status(201).json({ mensagem: "Registro de uso de IA criado com sucesso!", id: result.insertId })
        }
    })
}

const listarUsoIa = (req, res) => {
    let query = `
        select u.id, u.sistema, u.tipo, u.finalidade, u.tecnologia, u.nivelRisco, u.revisaoHumana,
               usr.id as usuarioId, usr.nome as usuarioNome, usr.email as usuarioEmail
        from usoia u
        inner join usuario usr on u.usuarioId = usr.id
    `
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ erro: err.sqlMessage })
        } else {
            res.json(result)
        }
    })
}

const atualizarUsoIa = (req, res) => {
    let { id } = req.params
    let { sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana } = req.body
    let query = "update usoia set sistema = ?, tipo = ?, finalidade = ?, tecnologia = ?, nivelRisco = ?, revisaoHumana = ? where id = ?"

    con.query(query, [sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana, id], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ mensagem: "Registro de uso de IA não encontrado." })
        } else {
            res.json({ mensagem: "Registro de uso de IA atualizado com sucesso!" })
        }
    })
}

const deletarUsoIa = (req, res) => {
    let { id } = req.params
    let query = "delete from usoia where id = ?"

    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ mensagem: "Registro de uso de IA não encontrado." })
        } else {
            res.json({ mensagem: "Registro excluído com sucesso!" })
        }
    })
}

const resumoRiscos = (req, res) => {
    let query = `
        select 
            sum(case when nivelRisco = 'Alto' then 1 else 0 end) as totalAlto,
            sum(case when nivelRisco = 'Medio' then 1 else 0 end) as totalMedio,
            sum(case when nivelRisco = 'Baixo' then 1 else 0 end) as totalBaixo
        from usoia
    `

    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ erro: err.sqlMessage })
        } else {
            res.json(result[0])
        }
    })
}

module.exports = {
    criarUsoIa,
    listarUsoIa,
    atualizarUsoIa,
    deletarUsoIa,
    resumoRiscos
}