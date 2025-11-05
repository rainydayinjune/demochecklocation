const { successResponse, errorResponse } = require('../../utils/responseModel')
const productService = require('../../services/product.service')
const constants = require('../../utils/constants')
const asyncHandler = require('../../middlewares/async')

/**
 * @api {get} /:id sản phẩm
 * @apiName Lấy chi tiết sản phẩm
 * @apiGroup Get
 *
 * @apiParam {String} id sản phẩm
 **/
module.exports = function (router) {
    router.get('/:id', asyncHandler(async function (req, res, next) {
        const payload = await productService.getProductDetail(req.params.id);
        successResponse(
            res,
            constants.STATUS_SUCCESS,
            payload
        )
    }))
}