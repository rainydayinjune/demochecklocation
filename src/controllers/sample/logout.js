const path = require('path');
const fs = require('fs');
const asyncHandler = require('../../middlewares/async');
const { adminProtect } = require('../../middlewares/auth');
// const Blacklist = require('../../models/blacklist');

/**
 * @api {get} /get-image Lấy ảnh
 * @apiName Lấy ảnh
 * @apiGroup Get
 *
 * @apiParam {String} null
 **/
module.exports = function (router) {
    router.post('/logout', adminProtect, asyncHandler(async function (req, res, next) {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            throw new ErrorResponse('Không có quyển truy cập', 401)
        }

        await Blacklist.create({
            token
        })

        res.status(200).json({
            success: true
        })
    }))
}



