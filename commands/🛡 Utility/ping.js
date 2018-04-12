module.exports = {
  // Information
  name: 'ping',
  aliases: ['.'],
  description: 'Test the bot\'s response time.',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    msg.channel.send(`P0ng!!1!11! My connection to the server is \`${Date.now() - msg.createdTimestamp} ms\` :alien:`);
  },
};