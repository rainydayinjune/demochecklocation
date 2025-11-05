const fs = require('fs')

const asyncHandler = fn => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path)
        }
        next(error)
    }
}

module.exports = asyncHandler