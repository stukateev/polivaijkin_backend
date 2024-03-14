const UsersCallBack = require('../models/usersCallBack');
const { handleError, FORBIDDEN } = require('../utils/errors');
const validator = require("validator");
const TelegramBot = require('node-telegram-bot-api');
const { API_KEY_BOT, CHAT_ID } = process.env;



const bot = new TelegramBot(API_KEY_BOT, {


});
async function sendMessageInTelegram(name, number, type, description) {
    await bot.sendMessage(CHAT_ID, `Пришла заявка. Имя: ${name} 
    Телефон: ${number} 
    ${type} 
    ${description}`);
}

const createCallBack = (req, res, next) => {
    const {
        name, number, type, description
    } = req.body;

    return UsersCallBack.create({
        name, number, type, description,
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
