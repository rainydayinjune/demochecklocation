const userRepository = require('../repositories/user.repository');

module.exports.userAuthentication = async (username, password) => {
    return userRepository.userAuthentication(username, password);
};