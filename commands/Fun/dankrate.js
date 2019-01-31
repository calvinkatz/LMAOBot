module.exports = {
  // Information
  name: 'dankrate',
  aliases: ['dank', 'd%', '%d'],
  description: 'LMAOBot will rank your dankness.',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    const randomnumber = Math.floor(Math.random() * 101);
    msg.channel.send({
      embed: {
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL,
        },
        title: 'Scanning...',
        thumbnail: {
          url: msg.author.avatarURL,
        },
        description: `${msg.member.user.username} is ${randomnumber}% dank! :fire:`,
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