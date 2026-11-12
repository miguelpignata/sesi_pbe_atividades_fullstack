const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestao_residuos'
})

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err)
        return
    }
    console.log("Conectado ao banco com sucesso!")
})

module.exports = connection