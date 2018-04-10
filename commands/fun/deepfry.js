module.exports = {
  // Information
  name: 'deepfry',
  aliases: ['dp'],
  description: "Get some deep fired memes.",
  // Requirements
  args: {
    req: false,
    min: 0
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  // Custom Data
  url: 'https://www.reddit.com/r/DeepFriedMemes/hot/.json?limit=52',
  // Functions
  run: (client, msg, args) => {
    https.get(this.url, (res) => {
      var body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        var response = JSON.parse(body);
        var index = response.data.children[Math.floor(Math.random() * 51) + 1].data;
        var image = index.preview.images[0].source.url
        var title = index.title;
        var link_to_post = "https://reddit.com" + index.permalink;
        const embed = new Discord.RichEmbed()
          .setTitle("/r/DeepFriedMemes")
          .setImage(image)
          .setColor(0x00AE86)
          .setDescription(`[${title}](${link_to_post})`)
          .setURL("https://reddit.com/r/deepfriedmemes");
        msg.channel.send(embed);
      }).on('error', function(e) {
        console.log("Got an error: ", e);
      })
    });
  },
}