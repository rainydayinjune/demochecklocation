'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

module.exports = function (app) {
    const controllersDir = path.join(__dirname, '../controllers');
    fs.readdirSync(controllersDir).forEach(file => {
        if (file.endsWith('.js')) {
            require(path.join(controllersDir, file))(app);
        }
    });
};