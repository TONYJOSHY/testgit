const mongoose = require('../db');
const { User } = require('../models/user');

// const newData = [
//     { email: 'user10@gmail.com', password: '123456' },
//     { email: 'user11@gmail.com', password: '123456' },
//     { email: 'user12@gmail.com', password: '123456' }
// ]

// User.insertMany(newData).then((val) => console.log(val))
//     .catch((err) => console.log(err.errors))

// const data = new User({ email: 'user13@gmail.com', password: '123456' })
// data.save().then((val) => console.log(val))
//     .catch((err) => console.log(err))

User.updateOne({ _id: '6427070c2a0a380d58714af1' },
    { password: '654321344' })
    .then((val) => console.log(val))
    .catch((err) => console.log(err))

User.findOne({ email: 'user13@gmail.com' }).then((val) => console.log(val))
    .catch((err) => console.log(err))

// User.findByIdAndDelete('6426821a07ec875fc3c8381a').then((val) => console.log(val))
//     .catch((err) => console.log(err))

