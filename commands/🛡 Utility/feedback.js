module.exports = {
  // Information
  name: 'feedback',
  aliases: ['fb'],
  description: 'Give feedback on LMAOBot.',
  // Requirements
  // Function
  run: async (client, command, msg, args) => {
    try {
      const channel = await client.guilds.get('399121674198581248').channels.get('399180621840121856');

      channel.send({
        embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL,
          },
          title: `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`,
          description: args.join(' '),
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: client.config.embed.footer,
          },
        },
      });
    } catch (error) {
      msg.channel.send(':x: Something went wrong... :confused:');
    }
  },
};