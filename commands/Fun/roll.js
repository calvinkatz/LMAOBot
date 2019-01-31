module.exports = {
  // Information
  name: 'roll',
  description: 'LMAOBot will roll the dice for you.',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    msg.channel.send('You rolled a ' + (Math.floor(Math.random() * 100) + 1) + '!');
  },
};