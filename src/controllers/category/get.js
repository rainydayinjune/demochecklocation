const { successResponse, errorResponse } = require('../../utils/responseModel')
const categoryRepository = require('../../repositories/category.repository')
const Category = require('../../models/category')
const constants = require('../../utils/constants')
const asyncHandler = require('../../middlewares/async')
const { Op } = require('sequelize');
const { commonSearchResult } = require('../../utils/commonSearchResult')

/**
 * @api {get} / Lấy danh sách danh mục
 * @apiName Lấy danh sách danh mục
 * @apiGroup Get
 *
 * @apiParam {String} null
 **/
module.exports = function (router) {
    router.get('/', asyncHandler(async function (req, res, next) {

        req.query.name = req.query.name ?? ''
        let whereCondition = {
            category_name: {
                [Op.like]: `%${req.query.name}%`
            },
            deletedAt: {
                [Op.eq]: null
            }
        }

        console.log(whereCondition);

        const payload = await commonSearchResult(req, Category, whereCondition)

        successResponse(
            res,
            constants.STATUS_SUCCESS,
            payload
        )
    }))
}