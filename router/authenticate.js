const { User } = require('./../db/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findUserToken(token).then((user) => {
        if (!user) return Promise.reject();
        req.token = token;
        req.user = user;
        next();
    }).catch((e) => res.status(401).send(e))
}

module.exports = { authenticate };