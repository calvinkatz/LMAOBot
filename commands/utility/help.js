const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setTitle("Available Commands")
    .setDescription("The prefix for my commands is `lmao`, so using a command would look like this: `lmao (command)`")
    .addField(":loud_sound: Sound Commands", "`addsound`, `listsounds`, `listpopularsounds`, `playsound`, `soundinfo`")
    .addField(":laughing: Fun Commands", "`agree`, `dankrate`, `gayrate`, `8ball`, `pun`, `roll`, `coinflip`, `ask`, `chuck`, `say`, `magik`")
    .addField(":camera: Image Commands", "`alone`, `doge`, `dolan`, `kappa`, `lenny`, `lol`, `megusta`, `notsure`, `pepe`, `sanic`, `spiderman`, `spooderman`, `troll`, `wat`")
    .addField(":shield: Utility Commands", "`donate`, `help`, `info`, `invite`, `ping`, `upvote`")
    .setFooter("patreon.com/lmaobot")
    .setColor(0x2471a3);

    message.channel.send(embed);
}

module.exports.help = {
    name: "help"
}