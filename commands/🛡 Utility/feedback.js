module.exports = {
  // Information
  name: 'feedback',
  aliases: ['fb'],
  description: 'Give the developers some feedback!',
  args: {
    req: true,
    min: 1,
  },
  cooldown: 300,
  embed: (msg, client, colour, args) => {
    return {
      color: colour,
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL,
      },
      title: `${msg.author.tag} (${msg.author.id})`,
      description: args.join(' '),
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: client.config.embed.footer,
      },
    };
  },
  // Function
  run: async (client, command, msg, args) => {
    try {
      command.args = args;
      command.msg = msg;
      await client.shard.broadcastEval(`
      async function everything(client) {
      if(client.channels.has(client.config.support.feedback)) {
        const channel = client.channels.get(client.config.support.feedback);
        const command = client.commands.get('${command.name}'); 
        const message = await channel.send({
          embed: ${JSON.stringify(command.embed(msg, client, 0x0000ff, args))}
        });
        client.add_msg_reaction_listener(command, message, ['👍', '👎'], {
          extra: {
            args: command.args,
            msg: command.msg,
          },
        });
      }
    }
    everything(this);`);
    msg.channel.send(`${client.config.emojis.info} Thank you! We have received your feedback. \n**PLEASE NOTE**: Abusing this command will result in a permanent ban from ever using it again!`);
  } catch (err) {
    msg.channel.send(':x: Uh oh! Something went wrong. Try again later.');
    console.error(`Feedback.js ERROR: ${err.stack}`);
  }
},
on_reaction: (client, command, data, operation, reaction) => {
  if(reaction.emoji.name === '👍') {
    data.message.edit({ embed: command.embed(data.extra.msg, client, 0x00ff00, data.extra.args) });
  } else if(reaction.emoji.name == '👎') {
    data.message.edit({ embed: command.embed(data.extra.msg, client, 0xff0000, data.extra.args) });
    data.message.delete();
  }
},
};
