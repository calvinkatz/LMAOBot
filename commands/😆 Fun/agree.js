module.exports = {
  // Information
  name: 'agree',
  aliases: ['ok'],
  description: 'LMAOBot agrees with you.',
  // Requirements
  args: {
    req: false,
    min: 0
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  //Function
  run: (client, msg, args) => {
    msg.channel.send(`I agree with ${msg.member.user}`);
  }
}