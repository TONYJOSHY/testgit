const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: (value) => {
        //         value.match('')
        //     }
        // }
    },
    password: {
        type: String,
        minlength: 6,
        required: true,

    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.createAuthCredentials = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id }, access).toString();
    user.tokens.push({ access, token })

    return user.save().then(() => token)
}

userSchema.methods.login = function (email, password) {
    var user = this;

    console.log(email, password)
    user.findOne({ email }).then((user) => {
        console.log(user)
        if (!user) return Promise.reject();
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, hash) => {
                if (hash) return resolve(user)
                return reject()
            })
        })
    }).catch((e) => Promise.reject())
}

userSchema.statics.findUserToken = function (token) {
    var user = this;
    var access = 'auth';
    var decoded;

    try {
        decoded = jwt.verify(token, access)
    } catch (e) {
        return Promise.reject();
    }

    return user.findOne({ "_id": decoded._id })
}

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

const User = mongoose.model('User', userSchema);

module.exports = { User }