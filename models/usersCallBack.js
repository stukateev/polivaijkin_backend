const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../utils/errors');

const usersCallBackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require
        },
        number: {
            type: String,
            require
        },
    },
    { versionKey: false },
);

module.exports = mongoose.model('usersCallBack', usersCallBackSchema);