module.exports = {
  // Information
  name: 'ping',
  aliases: ['.'],
  description: 'Test the bot\'s response time.',
  // Requirements
  args: {
    req: false,
    min: 0,
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  // Function
  run: (client, msg, args) => {
    msg.channel.send(`P0ng!!1!11! My connection to the server is \`${Date.now() - msg.createdTimestamp} ms\` :alien:`);
  },
};