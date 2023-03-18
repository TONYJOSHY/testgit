const express = require('express');
const bodyParser = require('body-parser')

const { mongoose } = require('./db/db');
const { ToDo } = require('./db/todo');
const { User } = require('./db/user');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("It's Express")
});

app.post('/', (req, res) => {
    console.log(req.body)
});

app.listen(process);