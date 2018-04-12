module.exports = {
  // Information
  name: 'gayrate',
  aliases: ['gay', 'g%', '%g'],
  description: 'LMAOBot will tell you how gay you\'re.',
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
        description: `${msg.member.user.username} is ${randomnumber}% gay! :gay_pride_flag:`,
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