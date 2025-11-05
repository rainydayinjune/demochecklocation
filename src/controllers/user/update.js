const moment = require('moment');
const User = require('../../models/user')
const { protect } = require('../../middlewares/auth')
const asyncHandler = require('../../middlewares/async')
const UserInformation = require('../../models/userInformation')
const { successResponse } = require('../../utils/responseModel')

module.exports = function (router) {
    router.put('/', protect, asyncHandler(async (req, res, next) => {
        const { dob, sex } = req.body;
        const userId = req.user.id;
        const userInformation = await UserInformation.findOne({ where: { user_id: userId } });
        let updateData = { sex };
        if (dob) {
            updateData.dob = moment(dob, 'DD/MM/YYYY').toDate();
        }
        await userInformation.update(updateData);
        const user = await User.findOne({ where: { id: userId } });
        const userInfo = {
            email: user.email,
            name: user.google_name,
            dob: userInformation.dob,
            sex: userInformation.sex
        }
        successResponse(res, 202, userInfo)
    }))
}