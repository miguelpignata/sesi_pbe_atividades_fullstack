const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usos_ia'
})

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err)
        return
    }
    console.log("Conectado ao MariaDB (usos_ia) com sucesso!")
})

module.exports = connection