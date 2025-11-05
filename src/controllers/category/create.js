const { successResponse, errorResponse } = require('../../utils/responseModel')
const categoryRepository = require('../../repositories/category.repository')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')
const constants = require('../../utils/constants')
const Category = require('../../models/category')
const { Op } = require('sequelize');
const { adminProtect } = require('../../middlewares/auth')

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
 * @api {post} / Tạo danh sách danh mục
 * @apiName Tạo danh sách danh mục
 * @apiGroup Post
 *
 * @apiParam {String} category_name, {File} category_image
 **/
module.exports = function (router) {
    router.post('/', adminProtect, upload.single('categoryImage'), asyncHandler(async (req, res, next) => {
        const file = req.file

        // Make sure this is a file
        if (!file) {
            throw new ErrorResponse('Hãy upload một file hình ảnh', 400)
        }
        // Make sure file is a photo
        if (!file.mimetype.startsWith('image')) {
            throw new ErrorResponse('File upload của bạn phải là hình ảnh', 400)
        }
        // Check file size
        if (file.size > process.env.MAX_FILE_UPLOAD) {
            throw new ErrorResponse(`Hãy upload file ảnh có dung lượng nhỏ hơn ${process.env.MAX_FILE_UPLOAD}`, 400)
        }

        // Check existed name   
        const existCategory = await Category.findOne({
            where: {
                deletedAt: {
                    [Op.eq]: null
                },
                category_name: req.body.categoryName
            }
        })
        if (existCategory) {
            throw new ErrorResponse('Tên danh mục sản phẩm đã tồn tại', 409)
        }
        const url = req.protocol + "://" + process.env.BACK_END_DOMAIN + '/uploads/' + file.filename
        const payload = await categoryRepository.createCategory(req.body.categoryName, url)

        successResponse(
            res,
            constants.STATUS_SUCCESS,
            payload
        )
    }))
}