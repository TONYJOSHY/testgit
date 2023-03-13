const _ = require('lodash');

var users = [
    { 'user': 'barney', 'age': 36, 'active': false },
    { 'user': 'fred', 'age': 40, 'active': false }
];

const testExample = () => {
    const data = _.every(users, ['active', false]);
    console.log(data);
}

module.exports = {
    testExample
}