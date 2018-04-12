const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyANS8AVVuSxUOifKikrllcTMRewOfMTFr4');
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
  name: 'addsound',
  aliases: ['asound', '+s'],
  description: 'Add a sound to the bot\'s sound board.',
  usage: '<sound name> <youtube url>',
  // Requirements
  args: {
    req: true,
    min: 2,
  },
  dev_only: false,
  guild_only: false,
  cooldown: 0,
  // Function
  run: async (client, msg, args) => {
    process.on('unhandledRejection', console.error);

    const soundName = args[0],
      soundURL = args[1];

    // Check that sound name is valid
    if (['nigger'].indexOf(soundName) !== -1) return msg.channel.send(' :x: Sorry, invalid sound name!');

    // Check that youtube url is valid
    if (!soundURL.includes('youtube.com/watch?')) return msg.channel.send(' :x: Invalid YouTube URL!');
    if (soundURL.includes('list' || 'playlist')) return msg.channel.send(' :x: Nice try, you can\'t add a playlists!');

    // Extract info from youtube url
    ytdl.getInfo(soundURL, async (err, info) => {
      if (info.length_seconds > 60) {
        return msg.channel.send(' :x: You cannot add sounds longer than 1 minute!');
      }

      try {
        const sound = await Sounds.create({
          name: soundName,
          url: soundURL,
          username: `${msg.author.username}#${msg.member.user.discriminator} (${msg.author.id})`,
        });

        return msg.channel.send(` sound **${sound.name}** added!`);
      } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') return msg.channel.send(' that sound already exists!');
        return msg.channel.send(' something went wrong while adding the sound: ```' + error + '```Join the support server for help on this issue.');
      }
    });
  },
};