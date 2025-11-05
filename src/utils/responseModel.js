// Common response

/**
 * @param {import('express').Response} res
 */

module.exports.successResponse = (res, status, payload) => {
    return res.status(status).json({
        succes: true,
        data: payload
    })
}

module.exports.errorResponse = (res, message) => {
    return res.json({
        error: message
    })
}