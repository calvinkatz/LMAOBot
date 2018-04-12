module.exports = {
  // Information
  name: 'magik',
  aliases: ['fp', 'mp'],
  description: 'LMAOBot will fuck up your profile pic.',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    const URL = msg.member.user.avatarURL;
    msg.channel.send({
      embed: {
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL,
        },
        title: ':thinking:',
        image: {
          url: `https://discord.services/api/magik?url=${URL}`,
        },
        color: 0x2471a3,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: client.config.embed.footer,
        },
      },
    });
  },
};