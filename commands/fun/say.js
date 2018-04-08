const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
	.setTitle(":x: You need to give me something to say!")
	.setDescription("Correct usage: `lmao say <what you want lmaobot to say>`!")
    .setColor(0xff0000)
    
    if(!args) return message.channel.send({embed});
    message.channel.send(args);
}

module.exports.help = {
    name: "say"
}