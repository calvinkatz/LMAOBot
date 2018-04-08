const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyANS8AVVuSxUOifKikrllcTMRewOfMTFr4');
const Sequelize = require('sequelize');
const prefix = "lmao";
const sequelize =  new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sql',
});

const Sounds = sequelize.define('sounds', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	url: Sequelize.STRING,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

    module.exports.run = async (client, message, args) => {
		process.on('unhandledRejection', console.error)
        const incorrectUsageSoundEmbed = new Discord.RichEmbed()
	    .setTitle(":x: Incorrect Usage!")
	    .setDescription("**Correct usage:** `lmao addsound <sound name> <youtube url>`")
		.setColor(0x2471a3)
		
		const input = message.content.slice(prefix.length + 1).split(' ');
		const soundName = input[1];
		const soundURL = input[2];
		if(!soundURL || !soundName) return message.channel.send(incorrectUsageSoundEmbed);
		if(!soundURL.includes("youtube.com/watch?")) return message.channel.send(":x: Invalid YouTube URL!");
		if(soundName.includes("nigger")) return message.channel.send(":x: Restricted sound name.");
		if(soundURL.includes("list" || "playlist")) return message.channel.send(":x: Nice try, you cannot add playlists.")
		ytdl.getInfo(soundURL, async (err, info) => { // request has finished
			if(info.length_seconds > 60) {
			  return message.channel.send(":x: You cannot add sounds longer than 1 minute!");
			}
		 
		try {
				const sound = await Sounds.create({
						name: soundName,
						url: soundURL,
						username: `${message.author.username}#${message.member.user.discriminator} (${message.author.id})`,
				});
				return message.channel.send(`Sound **${sound.name}** added!`)
		} catch (e) {
				if(e.name === 'SequelizeUniqueConstraintError') return message.channel.send("That sound already exists!");
				return message.channel.send("Something went wrong with adding the sound: ```" + error + "```Join the support server for help on this issue.")
		}
	});
    }

module.exports.help = {
    name: "addsound"
}