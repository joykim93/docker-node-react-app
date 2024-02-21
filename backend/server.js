const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db.js');

const app = express();

app.use(bodyParser.json());


db.getConnection((err, connection) => {
    const sql = `CREATE TABLE lists (
        id INTEGER AUTO INCREMENT,
        value TEXT,
        PRIMARY KEY (id)
    )`
    if (err) {
        throw err;
    } else {
        connection.query(sql, (err, result, field) => {

        })
    }
    connection.release();
})

app.get('/api/values', (req, res) => {
    db.getConnection((err, connection) => {
        const sql = `SELECT *FROM lists;`
        if (err) {
            return res.status(500).send(err);
        } else {
            connection.query(sql, (err, result, field) => {
                return res.json(result);
            })
        }
        connection.release();
    })
})

app.post('/api/value', (req, res) => {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value})`, (err, result, fields) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.json({ success: true, value: req.body.value })
        }
    })
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`application is running at ${PORT}`)
})