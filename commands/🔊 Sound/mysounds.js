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
  name: 'mysounds',
  aliases: ['msound', '>s'],
  description: 'Display all the sounds you\'ve added to LMAOBot.',
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
    const sound = await Sounds.findAll({
      where: {
        username: {
          [Sequelize.Op.like]: `% (${msg.author.id})`,
        },
      },
    });
    const soundString = sound.map(s => s.name).join(', ') || ':x: You don\'t have any sounds currently added!';

    const embed = new Discord.RichEmbed()
      .setTitle(`${msg.author.username}'s Sounds`)
      .setDescription(`${soundString}`)
      .setColor(0x2471a3);

    msg.channel.send(embed);
  },
};