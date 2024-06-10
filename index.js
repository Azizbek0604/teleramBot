const TelegramBot = require('node-telegram-bot-api');

const token = "7131536548:AAH_-70OxnOf6llhGfXXSzBRchlPKyuqchY";

const bot = new TelegramBot(token, {polling: true});

const {gameOptions, newGame} = require("./options")

const obj = {};


const startGame = async chatId =>{
    await bot.sendMessage(chatId, "Kampyuter 0 dan 9 gacha son o'yladi, siz bu sonni topishga harakt qiling");
    const randomNumber = Math.floor(Math.random() * 10)
    obj[chatId] = randomNumber;
    await bot.sendMessage(
        chatId, 
        "To'g'ri sonni toping", 
        gameOptions
    )
}

const bootstrap = () => {
    bot.setMyCommands([
        {
            command: '/start',
            description: "Bot haqida ma'lumot" 
        },
        {
            command: '/info',
            description: "O'zingiz haqingizda ma'lumot" 
        },
        {
            command: '/game',
            description: "O'yin O'ynash" 
        },
        {
            command: '/about',
            description: "Yaratuvchi haqida" 
        },
    ])

    
    bot.on('message', async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id;
    
        if (text === '/start') {
           return bot.sendMessage(chatId, `Assalomu Alaykum xurmatli ${msg.from.first_name} sizni botimizda ko'rib turganimizdan judayam hursandmiz !`)
        }
    
        if (text === '/info') {
            await bot.sendSticker(chatId, "https://sl.combot.org/webp_14/webp/4xf09f9888.webp")
            await bot.sendPhoto(chatId, "https://i.pinimg.com/550x/28/76/45/287645a299278424d8c830a4b1fc07c7.jpg")
            return bot.sendMessage(chatId, `Sizning telegram user bu ${msg.from.username} sizning ismingiz esa ${msg.from.first_name}`)
        }

        if (text === '/game'){
          return startGame(chatId)
        }
    
        bot.sendMessage(chatId, "Uzur men Sizning gapinga tushunmadim !")


        if (text === '/about') {
            return bot.sendMessage(chatId, `Assalomu alaykum men o'z yaratuvchim haqida shuni aytaman-ki uning ismi Shokiraliyev Azizbek u meni 10-iyun kuni yaratdi, va u 2024-yilning ma'lumotiga ko'ra Singapurskiy talabasidir.`)
        }
    })

    bot.on("callback_query", callbackQuery => {
        const data = callbackQuery.data;
        const chatId = callbackQuery.message.chat.id;
    
        if (data === "/again") {
            return startGame(chatId)
        }

        // Acknowledge the callback query
        bot.answerCallbackQuery(callbackQuery.id);
    
        if (data === obj[chatId].toString()) {
            bot.sendMessage(chatId, `Tabriklaymiz, siz to'g'ri javobni topdingiz. Kompyuter ${obj[chatId]} sonini tanlagan edi.`);
        } else {
            bot.sendMessage(chatId, `Sizning javobingiz noto'g'ri. To'g'ri javob ${obj[chatId]} soni edi.`);
        }
    
        bot.sendMessage(chatId, "Yangi o'yin uchun:", newGame);
        
        return;
    });
    
}
bootstrap()