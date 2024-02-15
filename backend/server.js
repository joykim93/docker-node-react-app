const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db.js');

const app = express();

app.use(bodyParser.json());

db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fields) => {
    console.log('results:', results)
})

app.get('/api/values', (req, res) => {
    db.pool.query('SELECT *FROM lists;', 
        (err, results, fields) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json(results);
            }
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