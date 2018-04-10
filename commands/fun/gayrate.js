module.exports = {
  // Information
  name: 'gayrate',
  aliases: ['gay', 'g%', '%g'],
  description: 'LMAOBot will tell you how gay you\'re.',
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
    var randomnumber = Math.floor(Math.random() * 101);
    const embed = new Discord.RichEmbed()
      .setTitle('Scanning...')
      .setDescription(`${msg.member.user.username} is ${randomnumber}% gay! :gay_pride_flag:`)
      .setColor(0x2471a3)
    msg.channel.send({
      embed: embed
    });
  }
}
msgmsg