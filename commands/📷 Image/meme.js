module.exports = {
  // Information
  name: 'meme',
  aliases: ['alone', 'doge', 'dolan', 'kappa', 'lenny', 'lol', 'megusta', 'notsure', 'pepe', 'sanic', 'spiderman', 'spooderman', 'troll', 'wat'],
  description: 'LMAOBot will send you a dank meme.',
  usage: '<meme name>',
  // Requirements
  // Custom Data
  memes: ['alone', 'doge', 'dolan', 'kappa', 'lenny', 'lol', 'megusta', 'notsure', 'pepe', 'sanic', 'spiderman', 'spooderman', 'troll', 'wat'],
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