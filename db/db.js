const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MyStudy');

module.exports = { mongoose }

// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/TodosAppDb');

//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` 
//     //if your database has auth enabled
// }
