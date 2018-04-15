var rp = require('request-promise');

module.exports = {
  // Information
  name: 'reddit',
  description: 'Server Sub-Reddits.',
  usage: '<sub reddit> <view>',
  explanation: {
    view: {
      description: 'What sort of post to view.',
      default: 'random',
      options: ['random', 'hot', 'new', 'old'],
    }
  },
  // Requirements
  // Function
  run: async (client, command, msg, args) => {
    let endpoint = 'random';
    if (args.length > 0 && command.explanation.view.indexOf(args[0].toLowerCase()) !== -1) {
      endpoint = args[0].toLowerCase();
    }

    const post = await command.get_post('deepfriedmemes', endpoint);

    const reply = await msg.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL,
        },
        title: 'Reddit',
        description: 'Browsing Reddit via Discord.',
        // fields: [],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: client.config.embed.footer,
        },
      },
    });

    // Add reactions to reply
    await reply.react('🔃');
  },
  get_post: async (subreddit, endpoint) => {
    url = `https://www.reddit.com/r/${subreddit}/${endpoint}.json?limit=100`;

    console.log(url);

    const data = JSON.parse(await rp(url));

    // if () {
    //
    // } else {
    //
    // }

    console.log(data);
  }
};