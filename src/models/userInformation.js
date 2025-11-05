const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');
const User = require('../models/user')

const UserInformation = db.define('user_information', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dob: {
        type: Sequelize.DATE,
    },
    sex: {
        // 0: khác, 1: Nam, 2: Nữ
        type: Sequelize.INTEGER,
        validate: {
            isIn: [[0, 1, 2]]
        }
    },
    deletedAt: {
        type: Sequelize.DATE,
    },
}, {
    tableName: 'user_information',
    timestamps: true,
    freezeTableName: true
});

User.hasOne(UserInformation, { foreignKey: 'user_id' });
UserInformation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserInformation;
