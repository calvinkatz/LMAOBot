const Discord = require('discord.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
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

module.exports = {
  // Information
  name: 'popularsounds',
  aliases: ['popsound', '^s'],
  description: 'List of popular sounds on LMAOBot\'s sound board.',
  // Requirements
  args: {
    req: false,
    min: 0,
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  // Function
  run: async (client, msg, args) => {
    const soundList = await Sounds.findAll({
      attributes: ['name', 'usage_count'],
    });
    const soundString = soundList.map(s => s.name).join(', ').slice(0, 2048) || ':x: There are no sounds currently set!';
    const embed = new Discord.RichEmbed()
      .setTitle('Most popular sounds:')
      .setDescription(`${soundString}`)
      .setColor(0xff6666)
      .setFooter('To add sounds, type \'lmao addsound <sound name> <youtube url>\'');
    return msg.channel.send({
      embed: embed,
    });
  },
};