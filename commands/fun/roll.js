module.exports = {
  // Information
  name: 'roll',
  aliases: [''],
  description: 'LMAOBot will roll the dice for you.',
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
    msg.channel.send("You rolled a " + (Math.floor(Math.random() * 100) + 1) + "!");
  }
}