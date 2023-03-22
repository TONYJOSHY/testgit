const express = require('express');
const { admin } = require('./admin');

const app = express();
const port = process.env.PORT || 3000;

app.locals.title = 'My App';

app.route('/')
    .all(function (req, res, next) {
        console.log('Authentication')
        next();
    })
    .get(function (req, res) {
        console.log('get url')
        res.send('hello world')
    })
    .post(function (req, res) {
        console.log('post url')
        res.send('post world')
    })
    .delete(function (req, res) {
        console.log('delete url')
        res.send('DELETE request to homepage')
    })

app.use('/admin', admin)

app.listen(port);