console.log("Starting Telegram Botinator...");

var TelegramBot = require('node-telegram-bot-api');
var Cleverbot = require('cleverbot-node');

cleverbot = new Cleverbot;

var firstMessage = true;

// replace the value below with the Telegram token you receive from @BotFather
var token = '277753577:AAELvypnyKkKAPHD8WGvBkjVeva3mWG8Qj8';

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, {
    polling: true
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function(msg, match) {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    var chatId = msg.chat.id;
    var resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);

});

//HELP COMMAND
bot.onText(/\/help/, function(msg, match) {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    var chatId = msg.chat.id;
    // var resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, "I am here to give you easy access to your Abalobi information.\n\n/help - display these commands\n/echo (message) - repeat your message");

});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', function(msg) {
    var chatId = msg.chat.id;
    if (firstMessage) {
        bot.sendMessage(chatId, "Hi there, welcome to the abalobi bot! Try some basic commands to get started. Type /help for more information.");
        firstMessage = false;
    } else {
        bot.sendMessage(chatId, "Message received.");
    }
    console.log(JSON.stringify(msg));
    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, "Received your message");
});
