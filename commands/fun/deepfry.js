const https = require('https');

module.exports.run = (client, message, args) => {
	// Functions
		https.get(url, (res) => {
			var body = '';

			res.on('data', (chunk) => {
				body += chunk;
			});

			res.on('end', () => {
				var response = JSON.parse(body);
				var index = Math.floor(Math.random() * 51) + 1;
				var image = response.data.children[index].data.preview.images[0].source.url
				var title = response.data.children[index].data.title;
				var link_to_post = "https://reddit.com" + response.data.children[index].data.permalink;
				const embed = new Discord.RichEmbed()
				.setTitle("/r/DeepFriedMemes")
				.setImage(image)
				.setColor(0x00AE86)
				.setDescription(`[${title}](${link_to_post})`)
				.setURL("https://reddit.com/r/deepfriedmemes");
				message.channel.send({embed});
			}).on('error', function(e) {
				console.log("Got an error: ", e);
			})
		});
}

module.exports.help = {
    // information
    name: 'deepfry',
    aliases: [],
    description: "",
}
