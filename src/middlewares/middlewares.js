const constants = require('../utils/constants');
const userService = require('../services/user.service');
const jwt = require('../helpers/jwt.helper');
const { successResponse, errorResponse } = require('../utils/responseModel');
const User = require('../models/user');

/**
 * Middleware to check if the user is authenticated.
 */
module.exports.checkAuthenticate = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error(constants.ACCESS_DENY);
        }
        const decoded = jwt.verifyToken(req.headers.authorization.split(' ')[1]);
        if (!decoded) {
            throw new Error(constants.EXPIRED_TOKEN);
        }
        const user = await userService.getUserByUsername(decoded.username);
        if (!user) {
            throw new Error(constants.EXPIRED_TOKEN);
        }
        await checkBlacklistToken(req);
        await checkActiveAccount(req);
        next();
    } catch (error) {
        res.status(400);
        errorResponse(res, error.message);
    }
};

/**
 * Middleware to check if the user's account is active.
 */
async function checkActiveAccount(req) {
    try {
        const decoded = jwt.verifyToken(req.headers.authorization.split(' ')[1]);
        const user = await User.findOne({
            where: {
                id: decoded.id
            }
        });
        if (!user) {
            throw new Error('Không tìm thấy user');
        }

        const isActive = user.active;
        if (!isActive) {
            throw new Error(constants.DISABLED_ACCOUNT);
        }
    } catch (error) {
        throw error;
    }
}