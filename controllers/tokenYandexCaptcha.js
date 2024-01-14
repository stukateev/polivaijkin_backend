
const https = require('https'),
    querystring = require('querystring');
const SMARTCAPTCHA_SERVER_KEY = 'ysc2_zmzFmGxXalFacinQESzE6ZD90tCbzLlmCNI7QIzXee8bebbb'
const checkYandexCaptcha = (req, res, next) => {
    const token = req.body.token;
    const userIP = req.body.userIP;

    function check_captcha( callback) {
        const options = {
            hostname: 'smartcaptcha.yandexcloud.net',
            port: 443,
            path: '/validate?' + querystring.stringify({
                secret: SMARTCAPTCHA_SERVER_KEY,
                token: token,
                ip: userIP,
            }),
            method: 'GET',
        };
        const reqsed = https.request(options, (result) => {
            result.on('data', (content) => {
                if (result.statusCode !== 200) {
                    console.error(`Allow access due to an error: code=${result.statusCode}; message=${content}`);
                    callback(true);
                    return;
                }
                callback(JSON.parse(content).status === 'ok');

            });


        });
        reqsed.on('error', (error) => {
            console.error(error);
            callback(true);
        });
        reqsed.end();

    }



    check_captcha( (passed) => {
        if (passed) {
            res.send(true)
        } else {
            res.send(false)
        }
    });


};



module.exports = {
    checkYandexCaptcha
};
