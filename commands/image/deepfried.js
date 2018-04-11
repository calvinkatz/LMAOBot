const https = require('https');
const url = 'https://www.reddit.com/r/DeepFriedMemes/hot/.json?limit=100'
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
	https.get(url, (res) => {
		var body = '';

		res.on('data', (chunk) => {
			body += chunk;
		});

		res.on('end', () => {
			var response = JSON.parse(body);
			var index = response.data.children[Math.floor(Math.random() * 99) + 1].data;
			if(index.post_hint !== "image") {
				var text = index.selftext;
				const textembed = new Discord.RichEmbed()
				.setTitle(subredditname)
				.setColor(0x00AE86)
				.setDescription(`[${title}](${link_to_post})\n\n${text}`)
				.setURL(`https://reddit.com/${subredditname}`);

				message.channel.send(textembed);
			}
			var image = index.preview.images[0].source.url
			var title = index.title;
			var link_to_post = "https://reddit.com" + index.permalink;
			var subredditname = index.subreddit_name_prefixed;
			if(index.post_hint !== "image") {
				const textembed = new Discord.RichEmbed()
				.setTitle(subredditname)
				.setColor(0x00AE86)
				.setDescription(`[${title}](${link_to_post})\n\n${text}`)
				.setURL(`https://reddit.com/${subredditname}`);

				message.channel.send(textembed);
			}
			const embed = new Discord.RichEmbed()
			.setTitle(subredditname)
			.setImage(image)
			.setColor(0x00AE86)
			.setDescription(`[${title}](${link_to_post})`)
			.setURL(`https://reddit.com/${subredditname}`);
			message.channel.send({embed});
		}).on('error', function(e) {
			console.log("Got an error: ", e);
		})
	});
}

module.exports.help = {
	name: "deepfried"
}