const categoryRepository = require('../repositories/category.repository');

module.exports.getCategory = async () => {
    return await categoryRepository.getCategory();
};