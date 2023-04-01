require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { users, refresh } = require('./users');

const app = express();
app.use(express.json())

app.get('/users', authenticateToken, (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user);
        res.status(201).send(user)
    } catch {
        res.status(500).send('Error')
    }
})

app.post('/login', async (req, res) => {
    const user = users.find(user => user.name == req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN)
            refresh.push(refreshToken);
            res.send({ ...user, accessToken, refreshToken })
        } else {
            res.send('Wrong password')
        }
    } catch {
        res.status(500).send('Error')
    }
})

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken)
    if (refreshToken == null) return res.status(401).send('No refresh token')
    if (!refresh.includes(refreshToken)) res.status(403).send('Refresh token expired')
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.status(403).send('Refresh token expired again');
        const accessToken = generateToken(user)
        res.send({ ...user, accessToken, refreshToken })
    })
})

function generateToken(user) {
    const payload = { name: user.name, password: user.password };
    // return jwt.sign(payload, process.env.ACCESS_TOKEN);
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '60s' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send('Unauthorized')
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).send('Token invalid');
        req.user = user;
        next();
    })
}

app.listen(3000);