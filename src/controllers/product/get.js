const { successResponse, errorResponse } = require('../../utils/responseModel')
const productService = require('../../services/product.service')
const constants = require('../../utils/constants')

/**
 * @api {get} / Lấy danh sách danh mục
 * @apiName Lấy danh sách danh mục
 * @apiGroup Get
 *
 * @apiParam {String} null
 **/
module.exports = function (router) {
    router.get('/', async function (req, res, next) {
        try {
            const payload = await productService.getProducts(req.query.categoryId, req.query.productName, req.query.isAvailable, req.query.weightType, req.query.priceType, req.query.orderType, req.query.page, req.query.limit)
            successResponse(
                res,
                constants.STATUS_SUCCESS,
                payload
            )
        } catch (error) {
            res.status(400)
            errorResponse(res, error.message)
        }
    })
}