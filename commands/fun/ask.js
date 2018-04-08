const Discord = require('discord.js');
const prefix = "lmao";
const asklist = [
    "Yes!",
    "No!"
  ]
module.exports.run = (client, message, args) => {
    var askargs = message.content.substring(prefix.length + 1).split(" ");
    if (askargs[1] != null ){
        var random = Math.floor(Math.random() *  asklist.length)
        message.channel.send(asklist[random]);
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
    name: "ask"
}