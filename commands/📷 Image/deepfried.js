const https = require('https');

module.exports = {
  // Information
  name: 'deepfried',
  aliases: ['df'],
  description: 'Get a random meme from Reddit/deepfried.',
  // Function
  run(client, command, msg, args) {
    https.get('https://www.reddit.com/r/deepfriedmemes/random/.json?limit=1', function(res) {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', async function() {
        const res = JSON.parse(body);

        if (index.post_hint !== 'image') {
          var text = index.selftext;
          const embed = new Discord.RichEmbed()
            .setTitle(subredditname)
            .setColor(0x00AE86)
            .setDescription(`[${title}](${link_to_post})\n\n${text}`)
            .setURL(`https://reddit.com/${subredditname}`);
        } else if (index.post_hint !== 'image') {
          const image = index.preview.images[0].source.url;
          var title = index.title;
          var link_to_post = 'https://reddit.com' + index.permalink;
          var subredditname = index.subreddit_name_prefixed;
          const embed = new Discord.RichEmbed()
            .setTitle(subredditname)
            .setColor(0x00AE86)
            .setDescription(`[${title}](${link_to_post})\n\n${text}`)
            .setURL(`https://reddit.com/${subredditname}`);
        } else {
          const embed = new Discord.RichEmbed()
            .setTitle(subredditname)
            .setImage(image)
            .setColor(0x00AE86)
            .setDescription(`[${title}](${link_to_post})`)
            .setURL(`https://reddit.com/${subredditname}`);
        }
        reply = await msg.channel.send(embed);

        await reply.react('🔃');
      }).on('error', function(e) {
        console.log('Got an error: ', e);
      });
    });
  },
  async on_reaction(bot, msg, type, reaction) {

  }
};