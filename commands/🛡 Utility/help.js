
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
        client.commands.forEach(function(command) {
          if (['admin'].indexOf(command.category.toLowerCase()) !== -1) {
            return;
          } else if (!(command.category in commands)) {
            commands[command.category] = [];
          }
  
          commands[command.category].push(command.name);
        });
  
        const fields = [];
        for (const category of Object.keys(commands)) {
          fields.push({
            name: `${category} Commands`,
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
            description: `Hey there, do you wan't 600 more daily dank coins? If you [vote here](https://discordbots.org/bot/lmaobot/vote) every 24hrs you will get a bonus 600 dank coins when using the daily command!`,
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