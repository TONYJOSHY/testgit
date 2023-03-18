const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    complete: {
        type: Boolean,
        default: false
    },
});

const ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = { ToDo }

