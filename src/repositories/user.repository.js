const User = require('../models/user');
const Transaction = require('../models/transaction');
const balanceRepository = require('../repositories/balance.repository');
const transactionRepository = require('../repositories/transaction.repository');
const constants = require('../utils/constants');
const jwt = require('../helpers/jwt.helper');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const Token = require('../models/token');
const nodeMailer = require('../utils/nodeMailer');

let user = {}

user.getUserProfile = async (id) => {
    return await User.findOne({
        where: {
            id: id,
            active: true
        }, attributes: {
            exclude: ['password', 'trans_password', 'deletedAt']
        }
    })
}

user.userRegister = async (username, email, password, ref_account, roleId) => {
    let existedUsername = await user.getUserByUsername(username);
    if (existedUsername) {
        throw new Error(constants.REGISTERED_USERNAME);
    }

    await User.findOne({
        where: {
            // username: username,
            // role_id: role,
            email: email
        }
    }).then(async user => {
        // Registered account
        if (user) {
            throw new Error(constants.REGISTERED_MAILADDRESS);
        } else {

            let newPassword = await bcrypt.hash(password, salt);
            let insertedUser = await User.create({
                username: username,
                email: email,
                password: newPassword,
                ref_account: ref_account,
                role_id: roleId,
                active: 1
            }).then().catch(err => {
                throw new Error(err.message);
            });
            balanceRepository.createBalanceForNewUser(insertedUser.dataValues.id);

            // send token mail
            const mailTooken = uuid.v4();
            await Token.create({
                token: mailTooken,
                email: email,
                type: 'register'
            });
            let url = process.env.FRONT_END_SERVER + '/register/verify/' + mailTooken
            console.log(url);
            const templateData = {
                url: url
            }
            const emailTemplate = fs.readFileSync(path.join(__dirname, '../views/registerForm.ejs'), 'utf8');

            await nodeMailer.sendEmail(email, '[Nemo Shop] Xác thực tài khoản', emailTemplate, templateData);
        }
    }).catch(err => {
        throw new Error(err.message);
    });
}

user.userAuthentication = async (username, password) => {
    let userInfo;
    await User.findOne({
        where: {
            [Op.or]: [
                { username: username },
                { email: username }
            ]

        }
    })
        .then(async user => {
            if (user) {
                //compare password in database with password recieved from api
                let comparePassword = await bcrypt.compare(password, user.password);
                if (comparePassword) {
                    // is verify check
                    if (!user.is_verify_mail) {
                        throw new Error(constants.NOT_VERIFY_ACCOUNT);
                    }
                    // disabled account check
                    if (!user.active) {
                        throw new Error(constants.DISABLED_ACCOUNT);
                    }
                    let token = jwt.generateToken(user.id, user.username, user.role_id);
                    userInfo = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role_id,
                        active: user.active,
                        is_active: user.is_active,
                        token: `Bearer ${token}`
                    };
                }
                else {
                    // "Password incorrect"
                    throw new Error(constants.PASSWORD_INCORRECT);
                }
            }
            else {
                throw new Error(constants.NOT_REGISTERRED);
            }
        }).catch(err => {
            throw new Error(err.message);
        });
    return userInfo;
}

module.exports = user;