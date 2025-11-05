const { successResponse, errorResponse } = require('../../utils/responseModel')
const categoryRepository = require('../../repositories/category.repository')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middlewares/async')
const constants = require('../../utils/constants')
const Category = require('../../models/category')
const { Op } = require('sequelize');
const { adminProtect } = require('../../middlewares/auth')
const Product = require('../../models/product')
const ProductDetail = require('../../models/productDetail')
const ProductImage = require('../../models/productImage')
const fs = require('fs')

const multer = require('multer')
const sequelize = require('../../databases/dbConnection')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/images/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + Math.floor(Math.random() * 9999) + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'productCover', maxCount: 1 }, { name: 'productImage', maxCount: 5 }])

/**
 * @api {post} /
 * @apiName Tạo sản phẩm mới
 * @apiGroup Post
 *
 * @apiParam {String} category_name, {File} category_image
 **/
module.exports = function (router) {
    router.post('/', adminProtect, cpUpload, asyncHandler(async (req, res, next) => {

        try {
            // Category id
            const categoryId = req.body.categoryId
            const existCategory = await Category.findOne({
                where: {
                    id: categoryId,
                    deletedAt: {
                        [Op.eq]: null
                    }
                }
            })

            if (!existCategory) {
                throw new ErrorResponse('Danh mục sản phẩm đã bị xóa hoặc không tồn tại', 404)
            }
            // Tên sản phẩm (String)
            const productName = req.body.productName
            if (!productName) {
                throw new ErrorResponse('Hãy nhập tên sản phẩm hợp lệ', 400)
            }

            const existProductName = await Product.findOne({
                where: {
                    product_name: productName,
                    deletedAt: {
                        [Op.eq]: null
                    }
                }
            })

            if (existProductName) {
                throw new ErrorResponse('Tên sản phẩm đã tồn tại', 400)
            }
            // Giá sản phẩm (Double)
            const listedPrice = req.body.listedPrice;

            if (!listedPrice || parseFloat(listedPrice) <= 0) {
                throw new ErrorResponse('Hãy nhập giá sản phẩm hợp lệ', 400)
            }
            // Đơn vị (giá/sản phẩm) (String)
            const unit = req.body.unit

            if (!unit) {
                throw new ErrorResponse('Hãy nhập đơn vị hợp lệ', 400)
            }
            // Ảnh bìa sản phẩm (File)
            if (!req.files['productImage'] || !req.files['productCover']) {
                throw new ErrorResponse('Hãy upload đầy đủ file ảnh', 400)
            }
            validateImage(req.files['productCover'][0])
            const coverImageUrl = req.protocol + "://" + process.env.BACK_END_DOMAIN + '/uploads/' + req.files['productCover'][0].filename
            // Mô tả sản phẩm
            const description = req.body.description
            if (!description) {
                throw new ErrorResponse('Hãy nhập mô tả sản phẩm hợp lệ', 400)
            }
            // Công dụng
            const uses = req.body.uses
            if (!uses) {
                throw new ErrorResponse('Hãy nhập công dung sản phẩm hợp lệ', 400)
            }
            // Ảnh chi tiết sản phẩm (Files)
            let productImages = []
            req.files['productImage'].forEach(e => {
                validateImage(e)
                let imgUrl = req.protocol + "://" + process.env.BACK_END_DOMAIN + '/uploads/' + e.filename
                productImages.push(imgUrl)
            })

            // Insert to database
            await sequelize.transaction(async t => {
                const product = await Product.create({
                    category_id: categoryId,
                    product_name: productName,
                    listed_price: listedPrice,
                    unit: unit,
                    cover_image_url: coverImageUrl
                }, { transaction: t })

                const productDetail = await ProductDetail.create({
                    product_id: product.id,
                    description: description,
                    uses: uses
                }, { transaction: t })

                const p1 = productImages.map(async (productImage) => {
                    let img = await ProductImage.create({
                        product_id: product.id,
                        url: productImage
                    })
                    console.log(productImage);
                    return
                })
                Promise.all(p1)
            });

            successResponse(res, 201, {})
        } catch (error) {
            // Xóa ảnh khi gặp lỗi
            if (!req.files['productCover']) {
                req.files['productCover'].forEach(element => {
                    fs.unlinkSync(element.path)
                });
            }
            req.files['productImage'].forEach(element => {
                fs.unlinkSync(element.path)
            });
            // Chuyển sang asyncHandler xử lý
            throw new ErrorResponse(error.message, error.statusCode)
        }
    }))
}

function validateImage(file) {
    if (!file) {
        throw new ErrorResponse('Hãy upload đầy đủ file ảnh', 400)
    }

    if (!file.mimetype.startsWith('image')) {
        throw new ErrorResponse('Hãy upload đầy đủ file ảnh', 400)
    }

    if (file.size > process.env.MAX_FILE_UPLOAD) {
        throw new ErrorResponse(`Hãy upload file ảnh có dung lượng nhỏ hơn ${process.env.MAX_FILE_UPLOAD}`, 400)
    }
}
