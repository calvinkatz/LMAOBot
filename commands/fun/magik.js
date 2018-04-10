module.exports = {
  // Information
  name: 'magik',
  aliases: ['fp', 'mp'],
  description: 'LMAOBot will fuck up your profile pic.',
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
    const URL = msg.member.user.avatarURL;
    const embed = new Discord.RichEmbed()

      .setTitle(":thinking:")
      .setImage(`https://discord.services/api/magik?url=${URL}`)
      .setColor(0x2471a3)
    msg.channel.send(embed);
  }
}