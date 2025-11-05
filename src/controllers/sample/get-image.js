const path = require('path');
const fs = require('fs');

/**
 * @api {get} /get-image Lấy ảnh
 * @apiName Lấy ảnh
 * @apiGroup Get
 *
 * @apiParam {String} null
 **/
module.exports = function (router) {
    router.get('/get-image', function (req, res, next) {
        try {
            const tempPath = path.join(__dirname, '../../images');
            console.log(tempPath);
            const imagePath = req.params.path ?? '';
            if (fs.existsSync(path.join(tempPath, imagePath)) && imagePath != '') {
                res.sendFile(path.join(tempPath, imagePath));
            } else {
                res.sendFile(path.join(tempPath, 'error-image-generic.png'));
            }
        } catch (error) {
            console.error(error);
        }
    })
}