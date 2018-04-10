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
  name: 'soundinfo',
  aliases: ['isound', '?s'],
  description: 'Get information on a sound from LMAOBot\'s soundboard.',
  usage: '<sound name>',
  // Requirements
  args: {
    req: true,
    min: 1,
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  // Function
  run: async (client, msg, args) => {
    const soundName = args;

    if (!soundName) return msg.channel.send(':x: You need to enter a sound name!');
    const sound = await Sounds.findOne({
      where: {
        name: soundName,
      },
    });
    if (sound) {

      const embed = new Discord.RichEmbed()
        .setTitle(`Results for "${soundName}"`)
        .setDescription(`**URL:** ${sound.url}`)
        .addField('Created by:', `${sound.username}`)
        .addField('Usage Count:', `${sound.usage_count}`)
        .setFooter(`${soundName} was created at ${sound.createdAt}`)
        .setColor(0x2471a3);
      return msg.channel.send({
        embed,
      });
    }
    return msg.channel.send(`Could not find sound: **${soundName}**`);
  },
};