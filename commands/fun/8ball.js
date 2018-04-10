module.exports = {
  // Information
  name: '8ball',
  aliases: ['8'],
  description: 'Get a eight ball\'s response.',
  usage: '<sound name> <youtube url>',
  // Requirements
  args: {
    req: false,
    min: 0
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  // Custom data
  responses: [
    "Yes!",
    "No...",
    "Maybe.",
    "Probably.",
    "I dont think so.",
    "Never!",
    "Indeed.",
    "Certainly.",
    "There is a possibility.",
    "No way!",
    "As I see it, yes.",
    "Most likely.",
    "You may rely on it.",
    "Signs point to yes."
  ],
  //Function
  run: (client, msg, args) => {
    msg.reply(this.responses[Math.floor(Math.random() * this.responses.length)]);
  }
}