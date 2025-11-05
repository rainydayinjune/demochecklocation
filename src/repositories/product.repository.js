const { Op } = require('sequelize');
const Product = require('../models/product');
const ProductDetail = require('../models/productDetail');
const ProductImage = require('../models/productImage');
const Category = require('../models/category');
const constants = require('../utils/constants');
const ErrorResponse = require('../utils/errorResponse');

let product = {}

product.getProducts = async (whereCondition, orderCondition, page, limit) => {

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Product.count({
        where: whereCondition
    })

    const products = await Product.findAll({
        where: whereCondition,
        attributes: {
            exclude: ['deletedAt', 'createdAt', 'updatedAt']
        },
        include: [{
            model: Category,
            require: true,
            where: {
                deletedAt: {
                    [Op.eq]: null
                }
            },
            attributes: ['category_name']
        }],
        order: orderCondition,
        limit: limit,
        offset: startIndex
    })

    const payload = products.map(product => {
        let temp = { ...product.get() }
        delete temp.category;
        return { ...temp, category_name: product.category.category_name };
    });

    return {
        products: payload,
        currentPage: page,
        total: total,
        totalPages: Math.ceil(total / limit)
    }
}

product.getProductDetail = async (id) => {
    const productDetail = await Product.findOne({
        where: {
            id: id,
            deletedAt: {
                [Op.eq]: null
            },
        },
        attributes: {
            exclude: ['deletedAt', 'createdAt', 'updatedAt', 'cover_image_url']
        },
        include: [
            {
                model: ProductDetail,
                require: true,
                where: {
                    deletedAt: {
                        [Op.eq]: null
                    }
                },
                attributes: {
                    exclude: ['id', 'product_id', 'deletedAt', 'createdAt', 'updatedAt']
                }
            },
            {
                model: ProductImage,
                required: false,
                where: {
                    deletedAt: {
                        [Op.eq]: null
                    }
                },
                attributes: ['url']
            }
        ],
    })
    if (!productDetail) {
        throw new ErrorResponse(constants.NOT_FOUND_PRODUCT, 404)
    }
    
    return productDetail;
}

module.exports = product;

function getSalePrice(listedPrice, salePercent) {
    if (!salePercent) {
        return listedPrice
    }
    return listedPrice / 100 * (100 - salePercent)
}