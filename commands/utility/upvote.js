const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setTitle("What is upvoting?")
    .setDescription("Upvoting is like liking a post on instagram, except it isn\'t instagram, and it isn\'t a picture of someone showing off their food, it\'s a bot.")
    .addField("Why should I upvote?", "Why not? The more votes we get, the higher we are on the \'leaderboard\'. The higher we are, more people who will want to use LMAOBot, and plus it only takes about 10 seconds of your time.", true)
    .addField("What rewards will I get if I upvote?", "You will have access to awesome upvoter-only commands and features. Is that good enough?", true)
    .addField("Ok, I want to upvote, but how?", "ha-ha, that one is very easy my friend, all you need to do is click [here](https://discordbots.org/bot/lmaobot) and press the big vote button!")
    .setColor(0x2471a3);

    message.channel.send(embed);
}

module.exports.help = {
    name: "upvote"
}