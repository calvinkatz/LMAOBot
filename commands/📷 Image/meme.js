module.exports = {
  // Information
  name: 'meme',
  aliases: ['alone', 'doge', 'dolan', 'kappa', 'lenny', 'lol', 'megusta', 'notsure', 'pepe', 'sanic', 'spiderman', 'spooderman', 'troll', 'wat'],
  description: 'LMAOBot will send you a dank meme.',
  usage: '<meme name>',
  // Requirements
  args: {
    req: false,
    min: 0,
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  // Custom Data
  memes: ['alone', 'doge', 'dolan', 'kappa', 'lenny', 'lol', 'megusta', 'notsure', 'pepe', 'sanic', 'spiderman', 'spooderman', 'troll', 'wat'],
  // Function
  run: (client, msg, args) => {
    args = msg.content.slice(client.config.prefix.length).split(/ +/);

    let meme;
    if (this.memes.indexOf(args[0]) !== -1) {
      meme = this.memes[args[0]];
    } else if (args[1] !== undefined && this.memes.indexOf(args[1]) !== -1) {
      meme = this.memes[args[1]];
    } else {
      meme = this.memes[Math.floor(Math.random() * this.memes.length)];
    }

    msg.channel.send({
      files: [
        `./img/${meme}.png`,
      ],
    });
  },
};