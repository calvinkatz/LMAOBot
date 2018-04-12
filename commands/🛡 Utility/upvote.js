module.exports = {
  // Information
  name: 'upvote',
  aliases: ['up', '^'],
  description: 'Upvote the bot on discordbots.org for exclusive perks! :heart_eyes:',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    msg.channel.send({
      embed: {
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL,
        },
        title: 'What is upvoting?',
        description: 'Upvoting is like liking a post on instagram, except it isn\'t instagram, and it isn\'t a picture of someone showing off their food, it\'s a bot.',
        fields: [{
          name: 'Why should I upvote?',
          value: 'Why not? The more votes we get, the higher we are on the \'leaderboard\'. The higher we are, more people who will want to use LMAOBot, and plus it only takes about 10 seconds of your time.',
        }, {
          name: 'Why should I upvote?',
          value: 'You will have access to awesome upvoter-only commands and features. Is that good enough?',
        }, {
          name: 'What rewards will I get if I upvote?',
          value: 'Ok, I want to upvote, but how?\', \'ha-ha, that one is very easy my friend, all you need to do is click [here](https://discordbots.org/bot/lmaobot) and press the big vote button!',
        }],
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