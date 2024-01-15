const UsersCallBack = require('../models/usersCallBack');
const { handleError, FORBIDDEN } = require('../utils/errors');
const validator = require("validator");
const TelegramBot = require('node-telegram-bot-api');


const API_KEY_BOT = '6849393490:AAGwXPm71Y0kuMgiXaYgoRSl-PFGL9tssPQ';
const chatID = "-1002033389063"
const bot = new TelegramBot(API_KEY_BOT, {

    polling: {
        interval: 3000,
        autoStart: true
    }
});
async function sendMessageInTelegram(name, number) {
    await bot.sendMessage(chatID, `<b>Пришла заявка.</b> Имя: <u>${name}</u> Телефон: <u>${number}</u> `);
}

const createCallBack = (req, res, next) => {
    const {
        name, number
    } = req.body;

    return UsersCallBack.create({
        name, number
    })
        .then((people) => {
            res.status(201).send(people)
            sendMessageInTelegram(name, number)
        })
        .catch((err) => handleError(err, next));
};
module.exports = {
    createCallBack,
};
