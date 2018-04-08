const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
    var randomnumber = Math.floor(Math.random() * 101);
    const embed = new Discord.RichEmbed()
    .setTitle('Scanning...')
    .setDescription(`${message.member.user.username} is ${randomnumber}% dank! :fire:`)
    .setColor(0x2471a3)
      message.channel.send({embed});
}

module.exports.help = {
    name: "dankrate"
}