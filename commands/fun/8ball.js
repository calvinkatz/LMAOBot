const Discord = require('discord.js');
const prefix = "lmao";
const eightball = [ // sets the answers to an eightball
    "Yes!",
    "No...",
    "Maybe.",
    "Probably.",
    "I dont think so.",
    "Never!",
    "Indeed.",
    "Certainly.",
    "There is a possibility.",
    "No way!",
    "As I see it, yes.",
    "Most likely.",
    "You may rely on it.",
    "Signs point to yes."
]
module.exports.run = (client, message, args) => {
    var eightballargs = message.content.substring(prefix.length + 1).split(" ");
    if (eightballargs[1] != null ){
        var random = Math.floor(Math.random() *  eightball.length)
        message.channel.send(eightball[random]);
        }
    else {
      const embed = new Discord.RichEmbed()
      .setTitle('REEEEeeEEe!!11!!!1!')
      .setColor(0x2471a3)
      .setDescription('ar3 yu g0nna ask a questi0n?!1?!1 :rolling_eyes:')
      .setImage('https://i.imgur.com/QgOFwVW.jpg')
      
      message.channel.send({embed});
    }
}

module.exports.help = {
    name: "8ball"
}