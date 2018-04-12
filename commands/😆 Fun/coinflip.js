module.exports = {
  // Information
  name: 'coinflip',
  aliases: ['coin'],
  description: 'LMAOBot will flip a coin for you.',
  // Requirements
  args: {
    req: false,
    min: 0,
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  // Custom Data
  responses: coinflips = [
    'heads',
    'tails',
  ],
  // Function
  run: (client, msg, args) => {
    const coinargs = msg.content.substring(prefix.length);
    if (coinargs[1] != null) {
      const random = Math.floor(Math.random() * coinflips.length);
      msg.channel.send('The coin landed on ' + (coinflips[random]) + '!');
    }
  },
};