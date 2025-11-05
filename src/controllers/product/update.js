const { adminProtect } = require('../../middlewares/auth')
const asyncHandler = require('../../middlewares/async')
const multer = require('multer')
const ErrorResponse = require('../../utils/errorResponse')
const Product = require('../../models/product')
const ProductDetail = require('../../models/productDetail')
const { Op } = require('sequelize');
const { successResponse } = require('../../utils/responseModel')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/images/public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

module.exports = function (router) {
    router.put('/:id', adminProtect, upload.single('coverImage'), asyncHandler(async (req, res, next) => {

        const productId = req.params.id
        const product = await Product.findOne({
            where: {
                id: productId,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        })

        if (!product) {
            throw new ErrorResponse('Không tìm thấy sản phẩm', 404)
        }

        // productName
        if (req.body.productName) {
            const existProduct = await Product.findOne({
                where: {
                    id: {
                        [Op.ne]: productId
                    },
                    product_name: req.body.productName,
                    deletedAt: {
                        [Op.eq]: null
                    }
                }
            })
            if (existProduct) {
                throw new ErrorResponse('Tên sản phẩm đã tồn tại', 409)
            }

            product.product_name = req.body.productName
        }
        // isAvailable
        const isAvailable = parseInt(req.body.isAvailable)
        if (isAvailable && (isAvailable != 1 && isAvailable != 0)) {
            throw new ErrorResponse('Hãy nhập trạng thái sản phẩm hợp lệ', 400)
        }
        product.is_available = isAvailable
        // listedPrice
        const listedPrice = req.body.listedPrice;

        if (parseFloat(listedPrice) <= 0) {
            throw new ErrorResponse('Hãy nhập giá sản phẩm hợp lệ', 400)
        }
        product.listed_price = listedPrice
        // unit
        const unit = req.body.unit
        if (unit) {
            product.unit = unit
        }
        // coverImageUrl
        if (req.file) {
            const coverImageUrl = req.protocol + "://" + process.env.BACK_END_DOMAIN + '/uploads/' + req.file.filename
            product.cover_image_url = coverImageUrl
        }
        // product detail
        const productDetail = await ProductDetail.findOne({
            where: {
                product_id: productId
            }
        })

        // description
        const description = req.body.description
        if (description) {
            productDetail.description = description
        }
        // uses
        const uses = req.body.uses
        if (uses) {
            productDetail.uses = uses
        }

        await product.save()
        await productDetail.save()

        successResponse(res, 202, {})
    }))
}