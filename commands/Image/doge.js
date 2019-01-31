const https = require('https');
const url = 'https://www.reddit.com/r/doge/hot/.json?limit=100'
const Discord = require('discord.js');

module.exports = {
    // Information
    name: 'doge',
    aliases: ['d'],
    description: "Get a random doge meme from reddit.",

    // Function
    run: (client, command, msg, args) => {
        https.get(url, (res) => {
            var body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                var response = JSON.parse(body);
                var index = null;
                var counter = 0;
                do {
                    counter++;
                    index = response.data.children[Math.floor(Math.random() * 99) + 1].data;
                }
                while (index.post_hint != "image" && counter < 10)

                var title = index.title;
                var link_to_post = "https://reddit.com" + index.permalink;
                var subredditname = index.subreddit_name_prefixed;

                if (counter >= 10) {
                    var text = index.selftext;
                    const textembed = new Discord.RichEmbed()
                        .setTitle(subredditname)
                        .setColor(0x00AE86)
                        .setDescription(`[${title}](${link_to_post})\n\n${text}`)
                        .setURL(`https://reddit.com/${subredditname}`);

                    msg.channel.send(textembed);
                }
                else {
                    var image = index.url
                    const imageembed = new Discord.RichEmbed()
                        .setTitle(subredditname)
                        .setImage(image)
                        .setColor(0x00AE86)
                        .setDescription(`[${title}](${link_to_post})`)
                        .setURL(`https://reddit.com/${subredditname}`);

                    msg.channel.send(imageembed);
                }
            }).on('error', function (e) {
                console.log("Got an error: ", e);
            })
        });
    }
}