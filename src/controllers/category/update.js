const { successResponse, errorResponse } = require('../../utils/responseModel')
const categoryRepository = require('../../repositories/category.repository')
const ErrorResponse = require('../../utils/errorResponse')
const { adminProtect } = require('../../middlewares/auth')
const asyncHandler = require('../../middlewares/async')
const constants = require('../../utils/constants')
const Category = require('../../models/category')
const { Op } = require('sequelize');


const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/images/public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

/**
 * @api {PUT} /categories/{id}
 * @apiName Update danh sách mục
 * @apiGroup PUT
 *
 * @apiParam {String} category_name, {File} category_image
 **/
module.exports = function (router) {
    router.put('/:id', adminProtect, upload.single('categoryImage'), asyncHandler(async (req, res, next) => {

        const category = await Category.findOne({
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        })

        if (!category) {
            throw new ErrorResponse('Không tìm thấy danh mục sản phẩm', 404)
        }

        // Check existed name   
        const existCategory = await Category.findOne({
            where: {
                id: {
                    [Op.ne]: req.params.id
                },
                category_name: req.body.categoryName,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        })
        if (existCategory) {
            throw new ErrorResponse('Tên Category đã tồn tại', 409)
        }

        // Update category
        const file = req.file

        if (file) {
            const url = req.protocol + "://" + process.env.BACK_END_DOMAIN + '/uploads/' + file.filename
            category.category_image_url = url
        }

        if (req.body.categoryName) {
            category.category_name = req.body.categoryName
        }

        await category.save()

        successResponse(
            res,
            constants.STATUS_SUCCESS,
            category
        )
    }))
}