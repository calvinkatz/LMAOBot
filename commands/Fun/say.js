module.exports = {
  // Information
  name: 'say',
  description: 'LMAOBot will say something for you.',
  usage: '<what you want LMAOBot to say>',
  // Requirements
  args: {
    req: true,
    min: 1,
  },
  // Function
  run: (client, command, msg, args) => {
    msg.channel.send(msg.content.slice(client.config.prefix.length + 1 + command.name.length));
  },
};