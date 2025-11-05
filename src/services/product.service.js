const productRepository = require('../repositories/product.repository')
const { Op } = require('sequelize')

module.exports.getProducts = async (categoryId, productName, isAvailable, weightType, priceType, orderType, page, limit) => {
    const orderCondition = []
    const whereCondition = {
        deletedAt: {
            [Op.eq]: null
        }
    }

    if (categoryId) {
        whereCondition.category_id = { [Op.like]: `%${categoryId}%` }
    }

    if (productName) {
        whereCondition.product_name = { [Op.like]: `%${productName}%` }
    }

    if (isAvailable) {
        whereCondition.is_available = isAvailable
    }

    if (weightType || priceType) {
        whereCondition[Op.or] = []
    }

    // if (weightType) {
    //     weightType = weightType.split(",")
    //     for (let i = 0; i < weightType.length; i++) {
    //         switch (parseInt(weightType[i])) {
    //             case 1:
    //                 whereCondition[Op.or].push({ weight: 100 })
    //                 break
    //             case 2:
    //                 whereCondition[Op.or].push({ weight: { [Op.between]: [140, 200] } })
    //                 break
    //             case 3:
    //                 whereCondition[Op.or].push({ weight: { [Op.between]: [180, 270] } })
    //                 break
    //             case 4:
    //                 whereCondition[Op.or].push({ weight: { [Op.between]: [300, 450] } })
    //                 break
    //             case 5:
    //                 whereCondition[Op.or].push({ weight: { [Op.gt]: 450 } })
    //                 break
    //         }
    //     }
    // }

    if (priceType) {
        priceType = priceType.split(",")
        for (let i = 0; i < priceType.length; i++) {
            switch (parseInt(priceType[i])) {
                case 1:
                    whereCondition[Op.or].push({ listed_price: { [Op.lt]: 150000 } })
                    break
                case 2:
                    whereCondition[Op.or].push({ listed_price: { [Op.between]: [150000, 300000] } })
                    break
                case 3:
                    whereCondition[Op.or].push({ listed_price: { [Op.gt]: 300000 } })
                    break
            }
        }
    }

    if (orderType) {
        switch (orderType) {
            case '1':
                orderCondition.push(['listed_price', 'DESC'])
                break
            case '2':
                orderCondition.push(['listed_price', 'ASC'])
                break
            case '3':
                orderCondition.push(['createdAt', 'ASC'])
                break
            case '4':
                orderCondition.push(['createdAt', 'DESC'])
                break
            default:
                break
        }
    }
    page = parseInt(page, 10) || 1
    limit = parseInt(limit, 10) || 25
    const products = await productRepository.getProducts(whereCondition, orderCondition, page, limit)

    return products;
}

module.exports.getProductDetail = async (id) => {
    const productDetail = await productRepository.getProductDetail(id)

    const productImageUrls = productDetail.product_images.map(image => image.url);
    let payload = { ...productDetail.get() }
    payload.description = payload.product_detail.description;
    payload.uses = payload.product_detail.uses;
    payload.product_images = productImageUrls;
    delete payload.product_detail

    return payload
}