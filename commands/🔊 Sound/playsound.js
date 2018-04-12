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
  name: 'playsound',
  aliases: ['psound', '.s'],
  description: 'Play a sound from LMAOBot\'s sound board.',
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

    if (!soundName) return msg.channel.send(':x: You need to enter a sound name to play!');
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.send(':x: You need to be in a voice channel to use this command!');
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has('CONNECT')) {
      return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
    }
    if (!permissions.has('SPEAK')) {
      return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
    }
    const sound = await Sounds.findOne({
      where: {
        name: soundName,
      },
    });
    if (sound) {
      sound.increment('usage_count');
      // ytdl code goes here..
      const streamOptions = {
        seek: 0,
        volume: 1,
      };
      const stream = ytdl(sound.url, {
        filter: 'audioonly',
      });
      voiceChannel.join().then(connection => {
        const dispatcher = connection.playStream(stream, streamOptions);
        dispatcher.on('end', end => {
          voiceChannel.leave();
        });
      });
      return msg.channel.send(`Now playing: **${soundName}**`);
    }
    return msg.channel.send(`Could not find sound: **${soundName}**\n\nTo view a list of all the available sounds, type **'lmao listsounds'**`);
  },
};