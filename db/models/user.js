// const mongoose = require('../../db/db');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    createdAt: Date,
    updatedAt: Date
});

userSchema.pre('save', function () {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
})

userSchema.pre('updateOne', function () {
    this.set({ updatedAt: new Date() });
    // console.log(this) User Model
})

userSchema.pre('updateOne', () => {
    // this.set({ updatedAt: new Date() });
    // console.log(this) {}
})

const User = mongoose.model('User', userSchema);

module.exports = { User }