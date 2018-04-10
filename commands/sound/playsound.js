const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyANS8AVVuSxUOifKikrllcTMRewOfMTFr4');
const Sequelize = require('sequelize');
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
        const soundName = args;
        
        if(!soundName) return message.channel.send(":x: You need to enter a sound name to play!")
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send(':x: You need to be in a voice channel to use this command!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}
		const sound = await Sounds.findOne({ where: { name: soundName } })
		if(sound) {
			sound.increment('usage_count');
			// ytdl code goes here..
			const streamOptions = { seek: 0, volume: 1 };
			const stream = ytdl(sound.url, { filter : 'audioonly' });
			voiceChannel.join().then(connection => {
				const dispatcher = connection.playStream(stream, streamOptions);
				dispatcher.on('end', end => {
					voiceChannel.leave();
				})
			})
			return message.channel.send(`Now playing: **${soundName}**`);
		}
		return message.channel.send(`Could not find sound: **${soundName}**\n\nTo view a list of all the available sounds, type **'lmao listsounds'**`)
}

module.exports.help = {
    name: "playsound"
}