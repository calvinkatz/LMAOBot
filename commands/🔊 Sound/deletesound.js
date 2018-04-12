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
  name: 'deletesound',
  aliases: ['dsound', '-s'],
  description: 'Delete a sound from LMAOBot\'s sound board.',
  // Requirements
  args: {
    req: true,
    min: 1,
  },
  // Function
  run: async (client, command, msg, args) => {
    const soundName = args[0];
    if (!soundName) return msg.channel.send(':x: You need to enter a sound to delete!');

    const sound = await Sounds.findAll({
      where: {
        username: {
          [Sequelize.Op.like]: `% (${msg.author.id})`,
        },
      },
    });

    const mysounds = sound.map(s => s.name).join(' ');
    if (!mysounds.includes(soundName) && client.is_developer(msg.author.id)) return msg.channel.send(':x: You can only delete your own sounds!');
    const rowCount = await Sounds.destroy({
      where: {
        name: soundName,
      },
    });
    if (!rowCount) return msg.channel.send(`Sound **${soundName}** does not exist.`);
    return msg.channel.send(`Sound **${soundName}** deleted.`);
  },
};