module.exports = {
  // Information
  name: 'donate',
  aliases: ['$'],
  description: 'Information on how you can support us and this dank bot! :heart:',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    msg.channel.send({
      embed: {
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL,
        },
        title: 'Donate',
        thumbnail: {
          url: msg.author.avatarURL,
        },
        description: 'Want to support us on patreon and help fund LMAOBot\'s hosting? Click [here](https://www.patreon.com/lmaobot) for more information.',
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