const express = require('express');

var admin = express.Router();

// admin.on('mount', function (parent) {
//     console.log('Admin Mounted')
//     console.log(parent) 
//     // refers to the parent app
// })

admin.get('/', function (req, res) {
    console.log(admin.mountpath)
    res.send('Admin Homepage')
})

module.exports = { admin }