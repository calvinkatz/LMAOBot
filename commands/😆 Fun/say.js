module.exports = {
  // Information
  name: 'say',
  aliases: [''],
  description: 'LMAOBot will say something for you.',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    const embed = new Discord.RichEmbed()
      .setTitle(':x: You need to give me something to say!')
      .setDescription('Correct usage: `lmao say <what you want lmaobot to say>`!')
      .setColor(0xff0000);

    if (!args) {
      return msg.channel.send({
        embed: embed,
      });
    }
    msg.channel.send(args);
  },
};