const { successResponse, errorResponse } = require('../../utils/responseModel')
const categoryRepository = require('../../repositories/category.repository')
const constants = require('../../utils/constants')
const asyncHandler = require('../../middlewares/async')
const Admin = require('../../models/admin')
const { Op } = require("sequelize");
const ErrorResponse = require('../../utils/errorResponse')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const crypto = require('crypto');
const jwt = require('../../helpers/jwt.helper');
const { jwtDecode } = require('jwt-decode');
const User = require('../../models/user')
const UserInformation = require('../../models/userInformation')

module.exports = function (router) {
    router.post('/login', asyncHandler(async function (req, res, next) {
        const googleToken = req.body.token;
        const decoded = jwtDecode(googleToken);

        const email = decoded.email
        let user = await User.findOne({
            where: {
                email: email
            },
            deletedAt: {
                [Op.eq]: null
            }
        });

        if (user) {
            await user.update({
                google_name: decoded.name
            })
        } else {
            user = await User.create({
                email: email,
                google_name: decoded.name
            })

            const userInformation = await UserInformation.create({
                user_id: user.id
            })
        }

        const jwtToken = jwt.generateToken(email, user.google_name, 'user')

        const userInfo = {
            email: email,
            username: user.google_name,
            role: 'user',
            token: `Bearer ${jwtToken}`
        };

        successResponse(
            res,
            constants.STATUS_SUCCESS,
            userInfo
        )
    }))
}