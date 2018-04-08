const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
    const URL = message.member.user.avatarURL;
		const embed = new Discord.RichEmbed()
		
		.setTitle(":thinking:")
		.setImage(`https://discord.services/api/magik?url=${URL}`)
		.setColor(0x2471a3)
		message.channel.send(embed);
}

module.exports.help = {
    name: "magik"
}