const con = require('../db')

const criarUsuario = (req, res) => {
    let { nome, email, senha } = req.body
    let query = "insert into usuario (nome, email, senha) value (?, ?, md5(?))"
    
    con.query(query, [nome, email, senha], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else {
            res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!", id: result.insertId })
        }
    })
}

const listarUsuarios = (req, res) => {
    let query = "select id, nome, email from usuario"
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ erro: err.sqlMessage })
        } else {
            res.json(result)
        }
    })
}

const atualizarUsuario = (req, res) => {
    let { id } = req.params
    let { nome, email } = req.body
    let query = "update usuario set nome = ?, email = ? where id = ?"

    con.query(query, [nome, email, id], (err, result) => {
        if (err) {
            res.status(400).json({ erro: err.sqlMessage })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ mensagem: "Usuário não encontrado." })
        } else {
            res.json({ mensagem: "Usuário atualizado com sucesso!" })
        }
    })
}

const deletarUsuario = (req, res) => {
    let { id } = req.params
    let query = "delete from usuario where id = ?"

    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(400).json({ erro: "Não é possível excluir usuário que possui registros de IA vinculados." })
        } else if (result.affectedRows === 0) {
            res.status(404).json({ mensagem: "Usuário não encontrado." })
        } else {
            res.json({ mensagem: "Usuário excluído com sucesso!" })
        }
    })
}

const login = (req, res) => {
    let { email, senha } = req.body
    let query = "select id, nome, email from usuario where email = ? and senha = md5(?)"

    con.query(query, [email, senha], (err, result) => {
        if (err) {
            res.status(500).json({ erro: err.sqlMessage })
        } else if (result.length > 0) {
            res.json({ mensagem: "Login efetuado com sucesso!", usuario: result[0] })
        } else {
            res.status(401).json({ mensagem: "E-mail ou senha inválidos." })
        }
    })
}

module.exports = {
    criarUsuario,
    listarUsuarios,
    atualizarUsuario,
    deletarUsuario,
    login
}