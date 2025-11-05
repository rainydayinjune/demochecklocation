const { successResponse, errorResponse } = require('../../utils/responseModel')
const asyncHandler = require('../../middlewares/async')
const constants = require('../../utils/constants')
const { protect } = require('../../middlewares/auth')

module.exports = function (router) {
    router.get('/me', protect, asyncHandler(async (req, res, next) => {

        const userInfo = {
            email: req.user.email,
            name: req.user.google_name
        }

        successResponse(
            res,
            constants.STATUS_SUCCESS,
            userInfo
        )
    }))
}