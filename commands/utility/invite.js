module.exports = {
  // Information
  name: 'invite',
  aliases: ['<', '>'],
  description: 'Invite the bot to other servers.',
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
    msg.channel.send({
      embed: {
        title: 'Invite LMAOBot to your Discord Server',
        color: 0x2471a3,
        description: '[Here](https://discordapp.com/oauth2/authorize/?permissions=1341643969&scope=bot&client_id=398413630149885952)',
        fields: [{
          name: "Join LMAOBot\'s Official Discord Server",
          value: "[Here](https://discord.gg/aQ25yFy)"
        }]
      }
    });
  }
}