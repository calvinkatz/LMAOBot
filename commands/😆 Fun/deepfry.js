const https = require('https');

module.exports = {
  // Information
  name: 'deepfry',
  aliases: ['dp'],
  description: 'Get some deep fired memes.',
  // Requirements
  // Custom Data
  url: 'https://www.reddit.com/r/DeepFriedMemes/hot/.json?limit=52',
  // Functions
  run: (client, command, msg, args) => {
    https.get(command.url, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(body);
        const index = response.data.children[Math.floor(Math.random() * 51) + 1].data;
        const image = index.preview.images[0].source.url;
        const title = index.title;
        const link_to_post = 'https://reddit.com' + index.permalink;

        msg.channel.send({
          embed: {
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL,
            },
            title: '/r/DeepFriedMemes',
            url: 'https://reddit.com/r/deepfriedmemes',
            description: `[${title}](${link_to_post})`,
            image: {
              url: image,
            },
            color: 0x00AE86,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: client.config.embed.footer,
            },
          },
        });
      }).on('error', function(e) {
        console.log('Got an error: ', e);
      });
    });
  },
};