module.exports = {
  // Information
  name: 'help',
  aliases: ['h', '?'],
  description: 'Information on the bot\'s usage.',
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