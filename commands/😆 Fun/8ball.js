module.exports = {
  // Information
  name: '8ball',
  aliases: ['8', '8b'],
  description: 'Get a eight ball\'s response.',
  // Requirements
  // Custom data
  responses: [
    'Yes!',
    'No...',
    'Maybe.',
    'Probably.',
    'I dont think so.',
    'Never!',
    'Indeed.',
    'Certainly.',
    'There is a possibility.',
    'No way!',
    'As I see it, yes.',
    'Most likely.',
    'You may rely on it.',
    'Signs point to yes.',
  ],
  // Function
  run: (client, command, msg, args) => {
    msg.channel.send(command.responses[Math.floor(Math.random() * command.responses.length)]);
  },
};