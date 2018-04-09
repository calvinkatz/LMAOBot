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

module.exports = {
  // Information
  name: 'help',
  aliases: ['h'],
  description: 'Information on the bot and it\'s usage.',
  // Requirements
  args: false,
  guild_only: false,
  cooldown: 0,
  //Function
  run: (client, msg, args) => {
    if (!args.length) {
      msg.reply({
        embed: {
          color: 0x2471a3,
          author: {
            name: bot.user.username,
            icon_url: bot.user.avatarURL,
          },
          title: 'This is an embed',
          url: 'https://discord.js.org/#/',
          description: 'Computer is a Discord bot for general usage made in Node.js!',
          fields: [{
            name: 'Commands',
            value: '*' + bot.commands.keyArray().join(', ') + '*',
          }],
          timestamp: new Date(),
          footer: {
            icon_url: bot.user.avatarURL,
            text: bot.config.embed.footer,
          },
        },
      });
    } else {
      const command = bot.commands.get(args[0]) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));

      if (!command) return;

      // Setup fields
      const fields = [{
        name: 'Command Information',
        value: `Requires Arguments: *${command.args}* | Server Command: *${command.guild_only}*` + (command.cooldown >= 1) ? ` | Cooldown: *${command.cooldown}*` : '';,
      }];

      if (command.aliases) {
        fields.push({
          name: 'Command Aliases',
          value: '*' + command.aliases.join(', ') + '*',
        });
      }

      msg.reply({
        embed: {
          color: 3447003,
          author: {
            name: bot.user.username,
            icon_url: bot.user.avatarURL,
          },
          title: bot.config.prefix + command.name + ' ' + (command.usage ? command.usage : ''),
          url: 'https://discord.js.org/#/',
          description: command.description,
          fields: fields,
          timestamp: new Date(),
          footer: {
            icon_url: bot.user.avatarURL,
            text: bot.config.embed.footer,
          },
        },
      });
    }
  },
}