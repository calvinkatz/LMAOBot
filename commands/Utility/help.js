module.exports = {
  // Information
  name: 'help',
  aliases: ['h', '?'],
  description: 'Information on the LMAOBot\'s usage.',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    if (!args.length) {

      const commands = {};
      client.commands.forEach(function (command) {
        if (['admin'].includes(command.category.toLowerCase())) {
          return;
        } else if (!(command.category in commands)) {
          commands[command.category] = [];
        }

        commands[command.category].push(command.name);
      });

      const fields = [];
      for (const category of Object.keys(commands)) {
        fields.push({
          name: category,
          value: '*' + commands[category].join(', ') + '*',
        });
      }

      msg.channel.send({
        embed: {
          color: 0x2471a3,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL,
          },
          title: 'Help Menu',
          description: `The prefix for my commands is \`${client.config.prefix}\`\nUsing a command would look like this: \`${client.config.prefix} <command name> <args>\``,
          fields: fields,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: client.config.embed.footer,
          },
        },
      });
    } else {
      const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
      if (!command) return;

      // Setup fields
      const fields = [];

      if ('args' in command && command.args.req === true) {
        fields.push({
          name: 'Argument Requirements',
          value: `Minimum: ${command.args.min}`,
        });
      }

      if ('explanation' in command) {
        const field_id = fields.push({
          name: 'Argument Information',
          value: '',
        }) - 1;
        for (const argument of Object.keys(command.explanation)) {
          fields[field_id].value += `__**${argument} :**__\n`;
          if ('description' in command.explanation[argument]) fields[field_id].value += `${command.explanation[argument].description}\n`;
          if ('default' in command.explanation[argument]) fields[field_id].value += `**Default:** *${command.explanation[argument].default}*\n`;
          if ('options' in command.explanation[argument]) fields[field_id].value += `**Options:** *${command.explanation[argument].options.join(', ')}*\n`;
        }
      }

      const requirements = [];
      for (const requirement of ['dev_only', 'guild_only', 'cooldown']) {
        if (requirement in command) {
          requirements.push(requirement.replace('_', ' ') + ': ' + command[requirement]);
        }
      }

      if (requirements.length > 0) {
        fields.push({
          name: 'Command Requirements',
          value: requirements.join(' | '),
        });
      }

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
            name: client.user.username,
            icon_url: client.user.avatarURL,
          },
          title: `${client.config.prefix} ${command.name}` + (command.usage ? ` ${command.usage}` : ''),
          description: command.description,
          fields: fields,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: client.config.embed.footer,
          },
        },
      });
    }
  },
};