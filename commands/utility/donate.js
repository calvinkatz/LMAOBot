const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setTitle("Donate")
    .setDescription("Want to support us on patreon and help fund LMAOBot\'s hosting? Click [here](https://www.patreon.com/lmaobot) for more information.")
    .setColor(0x2471a3);

    message.channel.send(embed);
}

module.exports.help = {
    name: "donate"
}