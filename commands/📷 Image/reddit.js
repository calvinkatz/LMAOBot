const https = require('https');

module.exports = {
  // Information
  name: 'reddit',
  description: 'Server Sub-Reddits.',
  usage: '<sub reddit> <sort> <order>',
  explanation: {
    sort: {
      description: 'Sort post.',
      default: 'hot',
      options: 'hot, new',
    },
    order: {
      description: 'Order post.',
      default: 'random',
      options: 'random, ordered',
    },
  },
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    args = msg.content.slice(client.config.prefix.length + 1).split(/ +/);

    let meme;
    if (args[0] !== undefined && command.memes.indexOf(args[0].toLowerCase()) !== -1) {
      meme = args[0].toLowerCase();
    } else if (args[1] !== undefined && command.memes.indexOf(args[1].toLowerCase()) !== -1) {
      meme = args[1].toLowerCase();
    } else {
      meme = command.memes[Math.floor(Math.random() * command.memes.length)];
    }

    msg.channel.send({
      files: [
        `./img/${meme}.png`,
      ],
    });
  },
};