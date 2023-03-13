const express = require('express');

var app = express();

app.use((req, res, next) => {
    next();
})

app.get('/', (req, res) => {
    res.send("It's Express")
});

app.get('/json', (req, res) => {
    res.send({
        name: 'Tony',
        age: 32
    })
})

app.listen(3000);