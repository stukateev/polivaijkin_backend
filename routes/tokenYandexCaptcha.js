const router = require('express').Router();
const {
    checkYandexCaptcha,
} = require('../controllers/tokenYandexCaptcha');


router.post('/', checkYandexCaptcha);


module.exports = router;
