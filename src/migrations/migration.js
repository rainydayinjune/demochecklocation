const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user');
const Admin = require('../models/admin');
const UserInformation = require('../models/userInformation');
const ProductDetail = require('../models/productDetail');
const ProductImage = require('../models/productImage');
const OrderHistory = require('../models/orderHistory');
const OrderHistoryDetail = require('../models/orderHistoryDetail');
const SystemSetting = require('../models/systemSetting');
const Blacklist = require('../models/blacklist');
const Link = require('../models/link');
const Timekeeper = require('../models/timekeeper');

async function createMigration() {
    try {
        // await User.sync({ alter: true });
        // await UserInformation.sync({ alter: true });
        // await Category.sync({ alter: true });
        // await Product.sync({ alter: true });
        // await ProductDetail.sync({ alter: true });
        // await ProductImage.sync({ alter: true });
        // await OrderHistory.sync({ alter: true });
        // await OrderHistoryDetail.sync({ alter: true });
        // await SystemSetting.sync({ alter: true });
        // await Product.sync({ alter: true });
        // await Blacklist.sync({ alter: true });
        // await Link.sync({ alter: true });
        await Timekeeper.sync({ alter: true });

    } catch (error) {
        console.error('Error creating table:', error);
    }
}

createMigration();