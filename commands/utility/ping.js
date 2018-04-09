module.exports = {
  // Information
  name: 'ping',
  aliases: ['.'],
  description: 'Test the bot\'s response time.',
  // Requirements
  args: false,
  guild_only: false,
  cooldown: 0,
  //Function
  run: (client, msg, args) => {
    message.channel.send(`P0ng!!1!11! My connection to the server is \`${Date.now() - message.createdTimestamp} ms\` :alien:`);
  }
}