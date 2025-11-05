const { Op } = require('sequelize');
const Category = require('../models/category');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')

let category = {}

category.getCategory = async () => {
    // throw new ErrorResponse('test', 203);

    const payload = await Category.findAll({
        where: {
            deletedAt: {
                [Op.eq]: null
            }
        },
        attributes: {
            exclude: ['deletedAt']
        }
    })

    return payload
}

category.createCategory = async (categoryName, categoryUrl) => {
    const payload = await Category.create({
        category_name: categoryName,
        category_image_url: categoryUrl
    })

    return payload
}

module.exports = category;