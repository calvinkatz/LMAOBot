module.exports = {
  // Information
  name: 'info',
  aliases: ['about', '%'],
  description: 'Information on the bot.',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    client.shard.broadcastEval('this.guilds.size').then(results => {
      msg.channel.send({
        embed: {
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL,
          },
          title: 'LMAOBot Info and Stats',
          thumbnail: {
            url: client.user.avatarURL,
          },
          description: 'Type \'lmao invite\' to invite LMAOBot to your server or join LMAOBot\'s support server!',
          fields: [{
            name: 'Servers',
            value: `${results.reduce((prev, val) => prev + val, 0)}`,
            inline: true,
          }, {
            name: 'Users:',
            value: `${client.users.size}`,
            inline: true,
          }, {
            name: 'Donators:',
            value: '**SetoVarious#1234** | $20.00 AUD\n**Scrungo#2873** | $5.95 AUD\n**arcade T#1887** | $3.00 AUD',
          }],
          image: {
            url: 'http://i0.kym-cdn.com/entries/icons/mobile/000/014/178/AyyyLmao.jpg',
          },
          color: 0x2471a3,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: client.config.embed.footer,
          },
        },
      });
    });
  },
};