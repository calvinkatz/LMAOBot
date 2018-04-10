module.exports = {
  // Information
  name: 'help',
  aliases: ['h', '?'],
  description: 'Information on the bot\'s usage.',
  // Requirements
  args: {
    req: false,
    min: 0
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  //Function
  run: (client, msg, args) => {
    if (!args.length) {
      msg.channel.send({
        embed: {
          color: 0x2471a3,
          author: {
            name: bot.user.username,
            icon_url: bot.user.avatarURL,
          },
          title: 'Help Menu',
          description: `The prefix for my commands is ${client.config.prefix}.\nUsing a command would look like this: ${client.config.prefix} <command name>`,
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

      // TODO Add more information on command

      // Setup fields
      const fields = [{
        name: 'Command Information',
        value: `Requires Arguments: *${command.args}* | Server Command: *${command.guild_only}*` + (command.cooldown >= 1) ? ` | Cooldown: *${command.cooldown}*` : '';,
      }];

      if ('aliases' in command) {
        fields.push({
          name: 'Command Aliases',
          value: '*' + command.aliases.join(', ') + '*',
        });
      }

      msg.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: bot.user.username,
            icon_url: bot.user.avatarURL,
          },
          title: bot.config.prefix + command.name + ' ' + (command.usage ? command.usage : ''),
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