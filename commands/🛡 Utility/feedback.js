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
  embed: (msg, client, colour, args, state) => {
    return {
      color: colour,
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL
      },
      title: `${msg.author.tag} (${msg.author.id})`,
      description: args.join(' '),
      timestamp: new Date(),
      footer: {
       icon_url: client.user.avatarURL,
       text: client.config.embed.footer,
     }
   }
 },
  // Function
  run: async (client, command, msg, args) => {
    try {
      const fbchannel = client.guilds.get(client.config.support.id).channels.get(client.config.support.feedback);
      const embed = await fbchannel.send({
        embed: command.embed(msg, client, 0x0000ff, args)
      })
      msg.channel.send(`${client.config.emojis.info} Thank you! We have received your feedback. \n**PLEASE NOTE**: Abusing this command will result in a permanent ban from ever using it again!`) 
      await client.add_msg_reaction_listener(command, embed, ['👍', '👎'], {
        extra: {
          args: args,
          msg: msg
        },
      }); 
    } catch (err) {
      msg.channel.send(":x: Uh oh! Something went wrong. Try again later.");
      console.error(`Feedback.js ERROR: ${err}`)
    }
    
  },
  on_reaction: (client, command, data, operation, reaction) => {
    if(reaction.emoji.name === "👍") {
      data.message.edit({embed: command.embed(data.extra.msg, client, 0x00ff00, data.extra.args)})
      data.message.pin()
    } else if(reaction.emoji.name == "👎") {
      data.message.edit({embed: command.embed(data.extra.msg, client, 0xff0000, data.extra.args)})
      if(data.message.pinned) data.message.unpin()
    }
  }
};
