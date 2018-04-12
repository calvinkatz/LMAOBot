module.exports = {
  // Information
  name: 'coinflip',
  aliases: ['coin'],
  description: 'LMAOBot will flip a coin for you.',
  // Requirements
  // Custom Data
  responses: [
    'heads',
    'tails',
  ],
  // Function
  run: (client, command, msg, args) => {
    msg.channel.send('The coin landed on ' + (command.responses[Math.floor(Math.random() * command.responses.length)]) + '!');
  },
};