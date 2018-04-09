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

    const sound = await Sounds.findAll({ where: { username: `${message.author.username}#${message.member.user.discriminator} (${message.author.id})` } });
    const soundString = sound.map(s => s.name).join(", ") || ":x: You don't have any sounds currently added!";

    const embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Sounds`)
    .setDescription(`${soundString}`)
    .setColor(0x2471a3)

    message.channel.send(embed);
}

module.exports.help = {
    name: "mysounds"
}