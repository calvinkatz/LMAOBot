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
  responses: [
    'heads',
    'tails',
  ],
  // Function
  run: (client, msg, args) => {
    msg.channel.send('The coin landed on ' + (this.responses[Math.floor(Math.random() * this.responses.length)]) + '!');
  },
};