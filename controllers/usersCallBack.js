const UsersCallBack = require('../models/usersCallBack');
const { handleError, FORBIDDEN } = require('../utils/errors');
const validator = require("validator");

const createCallBack = (req, res, next) => {
    const {
        name, number
    } = req.body;

    return UsersCallBack.create({
        name, number
    })
        .then((people) => res.status(201).send(people))
        .catch((err) => handleError(err, next));
};
module.exports = {
    createCallBack,
};
