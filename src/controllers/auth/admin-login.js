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

/**
 * @api {post} /login/admin
 * @apiName Lấy danh sách danh mục
 * @apiGroup Get
 *
 * @apiParam {String} null
 **/

// let newPassword = await bcrypt.hash(password, salt);

module.exports = function (router) {
    router.post('/admin', asyncHandler(async function (req, res, next) {
        const username = req.body.username
        const password = req.body.password

        const admin = await Admin.findOne({
            where: {
                username,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        })

        if (!admin) {
            throw new ErrorResponse('Thông tin không hợp lệ', 401)
        }

        const comparePassword = await bcrypt.compare(password, admin.password);
        if(!comparePassword){
            throw new ErrorResponse('Thông tin không hợp lệ', 401)
        }

        const token = jwt.generateToken(admin.id, admin.username, admin.role)

        adminInfo = {
            id: admin.id,
            username: admin.username,
            role: admin.role,
            token: `Bearer ${token}`
        };

        successResponse(
            res,
            constants.STATUS_SUCCESS,
            adminInfo
        )
    }))
}