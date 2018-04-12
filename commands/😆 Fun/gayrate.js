module.exports = {
  // Information
  name: 'gayrate',
  aliases: ['gay', 'g%', '%g'],
  description: 'LMAOBot will tell you how gay you\'re.',
  // Requirements
  // Function
  run: (client, command, msg, args) => {
    const randomnumber = Math.floor(Math.random() * 101);
    const embed = new Discord.RichEmbed()
      .setTitle('Scanning...')
      .setDescription(`${msg.member.user.username} is ${randomnumber}% gay! :gay_pride_flag:`)
      .setColor(0x2471a3);
    msg.channel.send({
      embed: embed,
    });
  },
};