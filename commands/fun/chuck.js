const Discord = require('discord.js');
const snekfetch = require('snekfetch');
module.exports.run = async (client, message, args) => {
    const chuckapi = "http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris";
    await snekfetch.get(chuckapi).query('joke', true).then(res => {  
    const embed = new Discord.RichEmbed()
    .setTitle('Chuck Norris Joke')
    .setDescription(res.body.value.joke)
    .setColor(0x2471a3)
    message.channel.send({embed});
    });
}

module.exports.help = {
    name: "chuck"
}