/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */

const fs = require('fs');
const https = require('https');


const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const morgan = require('morgan');

require('dotenv').config();
const TOKEN = process.env.TELEGRAM_TOKEN;
const port = process.env.PORT;
// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

bot.setWebHook(process.env.HEROKU_URL);


//bot.setWebHook(`${url}:${port}/bot${TOKEN}`);

const app = express();

var privateKey = fs.readFileSync('private-nodejs-heroku.key');
var certificate = fs.readFileSync('public-nodejs-heroku.pem');

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(port);


app.use(morgan('tiny'));
// parse the updates to JSON
app.use(express.json());


// We are receiving updates at the route below!
app.post(`/bot`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Just to ping!
bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, 'I am alive!');
});

