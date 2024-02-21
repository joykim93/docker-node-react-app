const mysql = require('mysql2');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'joy',
    database: 'myapp',
    port: 3306
})

module.exports = pool;