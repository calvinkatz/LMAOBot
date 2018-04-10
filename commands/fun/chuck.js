const snekfetch = require('snekfetch');
module.exports = {
  // Information
  name: 'chuck',
  aliases: [''],
  description: 'LMAOBot will tell you a joke.',
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
    const chuckapi = "http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris";
    await snekfetch.get(chuckapi).query('joke', true).then(res => {
      const embed = new Discord.RichEmbed()
        .setTitle('Chuck Norris Joke')
        .setDescription(res.body.value.joke)
        .setColor(0x2471a3)
      msg.channel.send({
        embed
      });
    });
  }
}