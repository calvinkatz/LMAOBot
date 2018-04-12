module.exports = {
  // Information
  name: 'dankrate',
  aliases: [''],
  description: 'LMAOBot will rank your dankness.',
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
    const randomnumber = Math.floor(Math.random() * 101);
    const embed = new Discord.RichEmbed()
      .setTitle('Scanning...')
      .setDescription(`${msg.member.user.username} is ${randomnumber}% dank! :fire:`)
      .setColor(0x2471a3);
    msg.channel.send({
      embed,
    });
  },
};