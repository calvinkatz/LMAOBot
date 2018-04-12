module.exports = {
  // Information
  name: 'dankrate',
  aliases: [''],
  description: 'LMAOBot will rank your dankness.',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
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