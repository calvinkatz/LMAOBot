module.exports = {
  // Information
  name: 'donate',
  aliases: ['$'],
  description: 'Information on how you can support us and this dank bot! :heart:',
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
    const embed = new Discord.RichEmbed()
      .setTitle('Donate')
      .setDescription('Want to support us on patreon and help fund LMAOBot\'s hosting? Click [here](https://www.patreon.com/lmaobot) for more information.')
      .setColor(0x2471a3);

    msg.channel.send({
      embed: embed,
    });
  },
};