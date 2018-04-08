const Discord = require('discord.js');
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
	process.on('unhandledRejection', console.error)
	const soundList = await Sounds.findAll({ attributes: ['name'] });
	const soundString = soundList.map(s => s.name).sort(() => Math.random() - 0.5).join(", ").slice(0, 2048) || ':x: There are no sounds currently set!';
	const embed = new Discord.RichEmbed()
	.setTitle("Featured Sounds:")
	.setDescription(`${soundString}`)
	.setColor(0x2471a3)
	.setFooter(`To add sounds, type 'lmao addsound <sound name> <youtube url>'`)
	return message.channel.send({embed});
}

module.exports.help = {
    name: "listsounds"
}