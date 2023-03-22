const express = require('express');
const bodyParser = require('body-parser')

const { mongoose } = require('./db/db');
const { ToDo } = require('./db/todo');
const { User } = require('./db/user');

const { authenticate } = require('./router/authenticate');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json())

app.get('/todos', (req, res) => {
    ToDo.find().then((doc) => res.status(200).send({ doc }))
        .catch((e) => res.send(e))
});

app.get('/todos/:id', (req, res) => {
    ToDo.find({ _id: req.params.id }).then((doc) => res.status(200).send({ doc }))
        .catch((e) => res.status(400).send(e))
})

app.post('/todos', (req, res) => {
    const todo = new ToDo({
        name: req.body.name,
        complete: req.body.complete,
    })

    todo.save().then((doc) => res.status(201).send(doc))
        .catch((e) => res.send(e))
});

app.post('/user', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    })

    user.save().then(() => user.createAuthCredentials())
        .then((token) => res.header('x-auth', token).send(user))
        .catch((e) => res.send(e))
})

app.get('/login', (req, res) => {
    console.log(req.body.email, req.body.password)
    User.login(req.body.email, req.body.password).then((user) => {
        return user.createAuthCredentials().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch((e) => res.send(e))
})

app.get('/user', authenticate, (req, res) => {
    res.send(req.user);
})

app.listen(port);