const router = require('express').Router();

const {
    createCallBack,
} = require('../controllers/usersCallBack');


router.post('/', createCallBack);


module.exports = router;
