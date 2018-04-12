const snekfetch = require('snekfetch');
module.exports = {
  // Information
  name: 'chuck',
  description: 'LMAOBot will tell you a Check Norris joke.',
  // Requirements
  // Function
  run: async (client, command, msg, args) => {
    const chuckapi = 'http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris';
    await snekfetch.get(chuckapi).query('joke', true).then(res => {
      msg.channel.send({
        embed: {
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL,
          },
          title: 'Chuck Norris Joke',
          description: `*${res.body.value.joke}*`,
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