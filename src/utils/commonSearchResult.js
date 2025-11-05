module.exports.commonSearchResult = async (req, model, whereCondition) => {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await model.count({
        where: whereCondition
    })

    // Get data
    const payload = await model.findAll({
        where: whereCondition,
        limit: limit,
        offset: startIndex
    })


    return {
        result: payload,
        currentPage: page,
        total: total,
        totalPages: Math.ceil(total / limit)
    }
}
