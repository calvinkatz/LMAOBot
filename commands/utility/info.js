const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
    client.shard.broadcastEval('this.guilds.size').then(results => {
        const embed = new Discord.RichEmbed()
        .setTitle('LMAOBot Info and Stats')
        .setDescription("Type \'lmao invite\' to invite LMAOBot to your server or join LMAOBot's support server!")
        .addField("Servers:", `${results.reduce((prev, val) => prev + val, 0)}`, true)
        .addField("Users:", client.users.size, true)
        .addField("Donators:", "**SetoVarious#1234** | $10.00 AUD\n**Scrungo#2873** | $5.95 AUD\n**arcade T#1887** | $3.00 AUD")
        .setColor(0x2471a3)
        .setImage('http://i0.kym-cdn.com/entries/icons/mobile/000/014/178/AyyyLmao.jpg')
        .setFooter('LMAOBot developed and created by Pete#4164 and Dim#4657')
        
        message.channel.send({embed});
    })
}

module.exports.help = {
    name: "info"
}