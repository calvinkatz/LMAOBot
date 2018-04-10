const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    const evalargs = message.content.split(" ").slice(2);

    const clean = text => {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }

    const embed = new Discord.RichEmbed()
    .setTitle(':x: Access Denied!')
    .setDescription('Nice try. Only bot developers can run this command!')
    .setColor(0x2471a3)
    
    if(message.author.id !== '223919574536552449' && message.author.id !== '219204779426054146' && message.author.id !== '198255568882761728' && message.author.id !== '199810482574458881') return message.channel.send({embed});
    try {
      const code = evalargs.join(" ");
      let evaled = await eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled).slice(0, 1950);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}

module.exports.help = {
    name: "eval"
}
