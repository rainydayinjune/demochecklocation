const { successResponse, errorResponse } = require('../../utils/responseModel')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')
const constants = require('../../utils/constants')
const Product = require('../../models/product')
const ProductImage = require('../../models/productImage')
const { adminProtect } = require('../../middlewares/auth')
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
 * @api {DELETE} /categories/{id}
 * @apiName Xóa danh sách mục
 * @apiGroup Delete
 *
 * @apiParam
 **/
module.exports = function (router) {
    router.post('/:id', adminProtect, upload.single('productImage'), asyncHandler(async (req, res, next) => {

        const product = await Product.findOne({
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        })

        if (!product) {
            throw new ErrorResponse('Không tìm thấy sản phẩm', 404)
        }

        const file = req.file;

        if (!file) {
            throw new ErrorResponse('Hãy upload một file hình ảnh', 400)
        }

        if (!file.mimetype.startsWith('image')) {
            throw new ErrorResponse('File upload của bạn phải là hình ảnh', 400)
        }

        if (file.size > process.env.MAX_FILE_UPLOAD) {
            throw new ErrorResponse(`Hãy upload file ảnh có dung lượng nhỏ hơn ${process.env.MAX_FILE_UPLOAD}`, 400)
        }

        const url = req.protocol + "://" + process.env.BACK_END_DOMAIN + '/uploads/' + file.filename

        const productImage = await ProductImage.create({
            url: url,
            product_id: req.params.id
        })

        successResponse(res, 201, {})
    }))
}