const Discord = require('discord.js');
module.exports = {
  // Information
  name: 'ask',
  aliases: [''],
  description: 'Ask LMAOBot a question.',
  usage: '<question>',
  // Requirements
  args: {
    req: true,
    min: 1,
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  // Custom Data
  responses: [
    'Yes!',
    'No!',
  ],
  // Function
  run: (client, msg, args) => {
    const askargs = msg.content.substring(prefix.length + 1).split(' ');
    if (askargs[1] != null) {
      msg.channel.send(this.responses[Math.floor(Math.random() * this.responses.length)]);
    } else {
      const embed = new Discord.RichEmbed()
        .setTitle('REEEEeeEEe!!11!!!1!')
        .setColor(0x2471a3)
        .setDescription('ar3 yu g0nna ask a questi0n?!1?!1 :rolling_eyes:')
        .setImage('https://i.imgur.com/QgOFwVW.jpg');

      msg.channel.send({
        embed: embed,
      });
    }
  },
};