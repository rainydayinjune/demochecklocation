const ErrorResponse = require('../utils/errorResponse')
const jwt = require('../helpers/jwt.helper')
// const Admin = require('../models/admin')
const asyncHandler = require('./async')
// const User = require('../models/user')
// const Blacklist = require('../models/blacklist')

// protected routes
exports.protect = asyncHandler(asyncHandler(async (req, res, next) => {
    const token = getToken(req)

    const check = await checkLoggedOut(token)
    if (check) {
        throw new ErrorResponse('Phiên đăng nhập đã hết hạn', 403)
    }

    try {
        const decoded = await jwt.verifyToken(token)
        req.user = await User.findOne({
            where: {
                email: decoded.id
            }
        })
        next()
    } catch (error) {
        throw new ErrorResponse('Không có quyển truy cập', 401)
    }
}))

exports.adminProtect = asyncHandler(asyncHandler(async (req, res, next) => {
    const token = getToken(req)

    const check = await checkLoggedOut(token)
    if (check) {
        throw new ErrorResponse('Phiên đăng nhập đã hết hạn', 403)
    }

    try {
        const decoded = await jwt.verifyToken(token)
        req.admin = await Admin.findOne({
            where: {
                id: decoded.id
            }
        })
        next()
    } catch (error) {
        throw new ErrorResponse('Không có quyển truy cập', 401)
    }
}))

function getToken(req) {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        throw new ErrorResponse('Không có quyển truy cập', 401)
    }

    return token
}

async function checkLoggedOut(token) {
    const blacklist = await Blacklist.findAll({
        where: {
            token: token
        }
    })

    if (blacklist.length === 0) {
        return false
    }

    return true
}