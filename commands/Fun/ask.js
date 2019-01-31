module.exports = {
  // Information
  name: 'ask',
  description: 'Ask LMAOBot a yes or no question and he\'ll answer.',
  usage: '<question>',
  // Requirements
  args: {
    req: true,
    min: 1,
  },
  // Custom Data
  responses: [
    'Yes!',
    'No!',
  ],
  // Function
  run: (client, command, msg, args) => {
    msg.channel.send(command.responses[Math.floor(Math.random() * command.responses.length)]);
  },
};