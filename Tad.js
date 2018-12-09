var messagelog = [];

// Set options
const interval = 60000;
const warningMessage = "Your message was deleted, Tron does not allow duplicate messages sent within quick succession. Please wait " + interval/1000 + " seconds before reposting.";
const maxDuplicatesWarning = 2;
const TOKEN = 'NTIwMzI2Mjg3OTMyMzkxNDQ1.DusPTA.dJBEbiJZ6C-p6y-hg7OTreiR_2k'
const Discord = require('discord.js')
const bot = new Discord.Client()

// Login
bot.login(TOKEN);

// Debug
bot.on('ready', () => {
  var generalChannel = bot.channels.get("520307213818920964")
  generalChannel.send("Connected")
})

// On every Message
bot.on("message", msg => {
  if (msg.author.bot) return;

  if ( (msg.author.id != bot.user.id) && msg.channel.guild) {
    var now = Math.floor(Date.now());

    messagelog.push({
      "time": now,
      "author": msg.author.id,
      "message": msg.content
    });

    // Check how many times the same message has been sent.
    var msgMatch = 0;
    for (var i = 0; i < messagelog.length; i++) {
      if (messagelog[i].message == msg.content && (messagelog[i].author == msg.author.id) && (msg.author.id !== bot.user.id) && (messagelog[i].time > now - interval)) {
        msgMatch++;
        if (msgMatch >= maxDuplicatesWarning) {
          msg.delete()
          msg.author.send(msg.author + " " + warningMessage);
        }
      }
    }
    if (messagelog.length >= 200) {
      messagelog.pop();
    }
  }
});