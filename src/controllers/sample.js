'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

module.exports = function (app) {
    const router = express.Router();

    const dir = path.join(__dirname, 'sample');
    fs.readdirSync(dir).forEach((file) => {
        if (file.endsWith('.js')) {
            const controllerPath = path.join(dir, file);
            const controller = require(path.resolve(controllerPath));
            controller(router);
        }
    });

    app.use('/', router);
};
