const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');

module.exports.generateToken = (id, username, role_id) => {
    return jwt.sign({ id, username, role_id }, config.secretKey, { expiresIn: config.tokenExpire });
}

module.exports.verifyToken = (token) => {
    let decoded;
    try {
        return decoded = jwt.verify(token, config.secretKey);
    } catch (err) {
        return null;
    }
}