const { Telegraf } = require('telegraf');
const fs = require('fs');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


require('dotenv').config()
//require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => ctx.reply('Бот запущен!'));
bot.help((ctx) => ctx.reply('Телеграм бот Node.js Webhook.'));

bot.on('message', async (ctx) => {
    //ctx.telegram.copyMessage(ctx.message.chat.id, ctx.message.from.id, ctx.message.message_id);
    console.log(`${ctx.message.from.username} ${ctx.message.text}`);

    let data = await getFromApi(ctx.message.text);

    vacancies = []
    for (let vac of data.items) {
        vacancies.push({ name: vac.name, employer: vac.employer.name, href: vac.alternate_url });
        //console.log(`${vac.name} ${vac.employer.name}`);
        ctx.telegram.sendMessage(ctx.message.chat.id, [vac.name, vac.employer.name, vac.alternate_url].join('\n'));
    }

});

getFromApi = async (thing) => {
    let url = `https://api.hh.ru/vacancies?area=2&text=${thing}&per_page=10
                &experience=noExperience&experience=between1And3`;
    
    let response = await fetch(url, {
        method: 'get',
        headers: { 'User-Agent': 'request' }
    });
    let data = await response.json();

    console.log(data);

    return data;
    
}

bot.launch()