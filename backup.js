const Discord = require('discord.js');
const client = new Discord.Client({
  disabledEvents: ['TYPING_START'],
});
const prefix = "lmao"
const snekfetch = require('snekfetch');
const ytdl = require('ytdl-core');
const Util = require('discord.js');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyANS8AVVuSxUOifKikrllcTMRewOfMTFr4');
const voteapi = "https://discordbots.org/api/bots/398413630149885952/votes?onlyids=true";
const Sequelize = require('sequelize');
const fs = require('fs');
client.commands = new Discord.Collection();

fs.readdir('./commands/utility', (err, files) => {
  if (err) console.error(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles <= 0) return console.log("There are no utility commands to load!");

  console.log(`Loading ${jsFiles.length} utility commands.`)

  jsFiles.forEach((f, i) => {
    let props = require(`./commands/utility/${f}`);
    console.log(`(Utility) ${i + 1}: ${f} loaded.`)
    client.commands.set(props.help.name, props);
  });
});

fs.readdir('./commands/fun', (err, files) => {
  if (err) console.error(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles <= 0) return console.log("There are no fun commands to load!");

  console.log(`Loading ${jsFiles.length} fun commands.`)

  jsFiles.forEach((f, i) => {
    let props = require(`./commands/fun/${f}`);
    console.log(`(Fun) ${i + 1}: ${f} loaded.`)
    client.commands.set(props.help.name, props);
  });
});

fs.readdir('./commands/image', (err, files) => {
  if (err) console.error(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles <= 0) return console.log("There are no image commands to load!");

  console.log(`Loading ${jsFiles.length} image commands.`)

  jsFiles.forEach((f, i) => {
    let props = require(`./commands/image/${f}`);
    console.log(`(Image) ${i + 1}: ${f} loaded.`)
    client.commands.set(props.help.name, props);
  });
});

fs.readdir('./commands/sound', (err, files) => {
  if (err) console.error(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles <= 0) return console.log("There are no sound commands to load!");

  console.log(`Loading ${jsFiles.length} sound commands.`)

  jsFiles.forEach((f, i) => {
    let props = require(`./commands/sound/${f}`);
    console.log(`(Sound) ${i + 1}: ${f} loaded.`)
    client.commands.set(props.help.name, props);
  });
});

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

client.once('ready', () => {
  Sounds.sync();
});

const clean = text => {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

client.on('message', async message => {
  const msg = message;

  const incorrectUsageSoundEmbed = new Discord.RichEmbed()
    .setTitle(":x: Incorrect Usage!")
    .setDescription("**Correct usage:** `lmao addsound <sound name> <youtube url>`")
    .setColor(0x2471a3)

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  // const input = message.content.slice(prefix.length + 1).split(' ');
  // const command = input.shift();
  // const commandArgs = input.join(' ');

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0] + 1;
  let args = messageArray.slice(1);

  if (command === "addsound") {
    const splitArgs = commandArgs.split(' ');
    const soundName = splitArgs.shift();
    const soundURL = splitArgs.join(' ');
    if (!soundURL || !soundName) return msg.channel.send(incorrectUsageSoundEmbed);
    if (!soundURL.includes("youtube.com/watch?")) return msg.channel.send(":x: Invalid YouTube URL!");
    if (soundName.includes("nigger")) return msg.channel.send(":x: Restricted sound name.");
    if (soundURL.includes("list" || "playlist")) return msg.channel.send(":x: Nice try, you cannot add playlists.")
    ytdl.getInfo(soundURL, async (err, info) => { // request has finished
      if (info.length_seconds > 60) {
        return msg.channel.send(":x: You cannot add sounds longer than 1 minute!");
      }

      try {
        const sound = await Sounds.create({
          name: soundName,
          url: soundURL,
          username: `${message.author.username}#${message.member.user.discriminator} (${message.author.id})`,
        });
        return msg.channel.send(`Sound **${sound.name}** added!`)
      } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') return msg.channel.send("That sound already exists!");
        return msg.channel.send("Something went wrong with adding the sound: ```" + error + "```Join the support server for help on this issue.")
      }
    });
  } else if (command === "playsound") {
    const soundName = commandArgs;
    if (!soundName) return msg.channel.send(":x: You need to enter a sound name to play!")
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.send(':x: You need to be in a voice channel to use this command!');
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has('CONNECT')) {
      return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
    }
    if (!permissions.has('SPEAK')) {
      return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
    }
    const sound = await Sounds.findOne({ where: { name: soundName } })
    if (sound) {
      sound.increment('usage_count');
      // ytdl code goes here..
      const streamOptions = { seek: 0, volume: 1 };
      const stream = ytdl(sound.url, { filter: 'audioonly' });
      voiceChannel.join().then(connection => {
        const dispatcher = connection.playStream(stream, streamOptions);
        dispatcher.on('end', end => {
          voiceChannel.leave();
        })
      })
      return msg.channel.send(`Now playing: **${soundName}**`);
    }
    return msg.channel.send(`Could not find sound: **${soundName}**\n\nTo view a list of all the available sounds, type **'lmao listsounds'**`)
  } else if (command === "soundinfo") {
    const soundName = commandArgs;
    if (!soundName) return msg.channel.send(":x: You need to enter a sound name!")
    const sound = await Sounds.findOne({ where: { name: soundName } });
    if (sound) {
      const embed = new Discord.RichEmbed()
        .setTitle(`Results for "${soundName}"`)
        .setDescription(`**URL:** ${sound.url}`)
        .addField(`Created by:`, `${sound.username}`)
        .addField(`Usage Count:`, `${sound.usage_count}`)
        .setFooter(`${soundName} was created at ${sound.createdAt}`)
        .setColor(0x2471a3)
      return msg.channel.send({ embed });
    }
    return msg.channel.send(`Could not find sound: **${soundName}**`)
  } else if (command === 'listsounds') {
    const soundList = await Sounds.findAll({ attributes: ['name'] });
    const soundString = soundList.map(s => s.name).sort(() => Math.random() - 0.5).join(", ").slice(0, 2048) || ':x: There are no sounds currently set!';
    const embed = new Discord.RichEmbed()
      .setTitle("Available sounds:")
      .setDescription(`${soundString}`)
      .setColor(0x2471a3)
      .setFooter(`To add sounds, type 'lmao addsound <sound name> <youtube url>'`)
    return msg.channel.send({ embed });
  } else if (command === 'listpopularsounds') {
    const soundList = await Sounds.findAll({ attributes: ['name', 'usage_count'] });
    const soundString = soundList.map(s => s.name).join(", ").slice(0, 2048) || ':x: There are no sounds currently set!';
    const embed = new Discord.RichEmbed()
      .setTitle("Most popular sounds:")
      .setDescription(`${soundString}`)
      .setColor(0xff6666)
      .setFooter(`To add sounds, type 'lmao addsound <sound name> <youtube url>'`)
    return msg.channel.send({ embed });
  } else if (command === 'deletesound') {
    const soundName = commandArgs;
    if (!soundName) return msg.channel.send(":x: You need to enter a sound to delete!")
    if (!msg.author.id === "223919574536552449" && !msg.author.id === "219204779426054146") return msg.channel.send(":x: Only bot developers can delete sounds!");
    const rowCount = await Sounds.destroy({ where: { name: soundName } });
    if (!rowCount) return msg.channel.send(`Sound **${soundName}** does not exist.`)
    return msg.channel.send(`Sound **${soundName}** deleted.`)
  } else if (command === 'magik') {
    const URL = msg.member.user.avatarURL;
    const embed = new Discord.RichEmbed()

      .setTitle(":thinking:")
      .setImage(`https://discord.services/api/magik?url=${URL}`)
      .setColor(0x2471a3)
    msg.channel.send(embed);
  }


  const sayArgs = msg.content.split(" ")
  const sayString = sayArgs.slice(2).join(" ");

  const embed = new Discord.RichEmbed()
    .setTitle(":x: You need to give me something to say!")
    .setDescription("Correct usage: `lmao say <what you want lmaobot to say>`!")
    .setColor(0xff0000)

  if (msg.content.startsWith(prefix + " say")) {
    if (!sayString) return msg.channel.send({ embed });
    msg.channel.send(sayString);
  }

  const nobugembed = new Discord.RichEmbed()
    .setTitle(":x: Incorrect usage!")
    .setDescription("To report a bug, type \'lmao bugreport <bug>\'!")
    .setColor(0xff0000)
  if (msg.content === (prefix + " bugreport")) return msg.channel.send(nobugembed)

  if (msg.content.startsWith(prefix + " bugreport")) {

    const embed = new Discord.RichEmbed()
      .setAuthor(`Bug Report:`, `${message.member.user.avatarURL}`)
      .setDescription(`**Member:** ${message.member.user.username}#${message.member.user.discriminator} (${message.author.id})\n**Report:** ${commandString}`)
      .setColor(0xff0000)

    client.guilds.get("399121674198581248").channels.get("416611377554391091").send({ embed });


    const secondembed = new Discord.RichEmbed()
      .setTitle(":white_check_mark: Successfully sent Bug Report!")
      .setDescription("Thank you for reporting a bug, your message will now be sent to the developers so they can fix it ASAP!")
      .setColor(0x32CD32)
    msg.channel.send(secondembed);
  }

  const evalargs = message.content.split(" ").slice(2);

  if (message.content.startsWith(prefix + " eval")) {

    const embed = new Discord.RichEmbed()
      .setTitle(':x: Access Denied!')
      .setDescription('Nice try. Only bot developers can run this command!')
      .setColor(0x2471a3)

    if (message.author.id !== '223919574536552449' && message.author.id !== '219204779426054146') return msg.channel.send({ embed });
    try {
      const code = evalargs.join(" ");
      let evaled = await eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled).slice(0, 1950);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }



  let supportantiadguild = client.guilds.get("399121674198581248"); // support server id
  if (supportantiadguild) {
    if (message.guild.id === supportantiadguild.id) {
      if (message.content.includes("discord.gg")) {
        if (message.author.id === "223919574536552449") {
          console.log('antiad> Developer: Ignoring.')
        } else {
          console.log('antiad> User: posted an invite link - deleted and warned.')
          message.delete();


          client.channels.get('399181719510450186').send(`${message.member.user}, please do not post invite links. - You have been warned.`);
        }
      }
    }
  }

  if (message.content.startsWith(prefix + " chuck")) {
    const chuckapi = "http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris";
    await snekfetch.get(chuckapi).query('joke', true).then(res => {
      const embed = new Discord.RichEmbed()
        .setTitle('Chuck Norris Joke')
        .setDescription(res.body.value.joke)
        .setColor(0x2471a3)
      message.channel.send({ embed });
    });
  }

  if (message.content === (prefix + ' dankrate')) {
    var randomnumber = Math.floor(Math.random() * 101);
    const embed = new Discord.RichEmbed()
      .setTitle('Scanning...')
      .setDescription(`${message.member.user.username} is ${randomnumber}% dank! :fire:`)
      .setColor(0x2471a3)
    message.channel.send({ embed });
  }

  if (message.content === (prefix + ' gayrate')) {
    var randomnumber = Math.floor(Math.random() * 101);
    const embed = new Discord.RichEmbed()
      .setTitle('Scanning...')
      .setDescription(`${message.member.user.username} is ${randomnumber}% gay! :gay_pride_flag:`)
      .setColor(0x2471a3)
    message.channel.send({ embed });
  }
  if (message.channel.type === "dm") {
    return;
  }

  if (message.content === (prefix + " rps")) {
    const embed = new Discord.RichEmbed()
      .setTitle(':x: Incorrect Usage!')
      .setDescription('Type `lmao rps <rock/paper/scissors>` to play!')
      .setColor(0xff0000)

    message.channel.send({ embed });
  }

  if (message.content === "I chose `rock`!!11!1") {
    if (message.author.id === '398413630149885952') {
      const embed = new Discord.RichEmbed()
        .setTitle("It\'s a tie! :tada: :necktie:")
        .setDescription("To play another game, type `lmao rps <rock/paper/scissors>`!")
        .setColor(0x2471a3)

      message.channel.send({ embed });
    }
  }

  if (message.content === "I chose `paper`!11!1") {
    if (message.author.id === '398413630149885952') {
      const embed = new Discord.RichEmbed()
        .setTitle("It\'s a tie! :tada: :necktie:")
        .setDescription("To play another game, type `lmao rps <rock/paper/scissors>`!")
        .setColor(0x2471a3)

      message.channel.send({ embed });
    }
  }

  if (message.content === "I chose `scissors`!!!1!") {
    if (message.author.id === '398413630149885952') {
      const embed = new Discord.RichEmbed()
        .setTitle("It\'s a tie! :tada: :necktie:")
        .setDescription("To play another game, type `lmao rps <rock/paper/scissors>`!")
        .setColor(0x2471a3)

      message.channel.send({ embed });
    }
  }


  if (message.content === "I chose `paper`!!11!1") {
    if (message.author.id === '398413630149885952') {
      const embed = new Discord.RichEmbed()
        .setTitle('I win! :tada:')
        .setDescription("To play another game, type `lmao rps <rock/paper/scissors>`!")
        .setColor(0x2471a3)

      message.channel.send({ embed });
    }
  }

  if (message.content === "I chose `scissors`!!11!1") {
    if (message.author.id === '398413630149885952') {
      const embed = new Discord.RichEmbed()
        .setTitle('You win, GG! :tada: :tired_face:')
        .setDescription("To play another game, type `lmao rps <rock/paper/scissors>`!")
        .setColor(0x2471a3)

      message.channel.send({ embed });
    }
  }

  if (message.content === (prefix + " rps rock")) {
    var random = Math.floor(Math.random() * rpslist3.length)
    message.channel.send(rpslist3[random]);
  }

  if (message.content === (prefix + " rps paper")) {
    var random = Math.floor(Math.random() * rpslist2.length)
    message.channel.send(rpslist2[random]);
  }

  if (message.content === "I chose `scissors`!11!1") {
    if (message.author.id === '398413630149885952') {
      const embed = new Discord.RichEmbed()
        .setTitle('I win! :tada:')
        .setDescription("To play another game, type `lmao rps <rock/paper/scissors>`!")
        .setColor(0x2471a3)

      message.channel.send({ embed });
    }
  }

  if (message.content === "I chose `rock`!11!1") {
    if (message.author.id === '398413630149885952') {
      const embed = new Discord.RichEmbed()
        .setTitle('You win, GG! :tada: :tired_face:')
        .setDescription("To play another game, type `lmao rps <rock/paper/scissors>`!")
        .setColor(0x2471a3)

      message.channel.send({ embed });
    }
  }

  if (message.content === (prefix + " rps scissors")) {
    var random = Math.floor(Math.random() * rpslist1.length)
    message.channel.send(rpslist1[random]);
  }

  if (message.content === "I chose `rock`!!!1!") {
    if (message.author.id === '398413630149885952') {
      const embed = new Discord.RichEmbed()
        .setTitle('I win! :tada:')
        .setDescription("To play another game, type `lmao rps <rock/paper/scissors>`!")
        .setColor(0x2471a3)

      message.channel.send({ embed });
    }
  }

  if (message.content === "I chose `paper`!!!1!") {
    if (message.author.id === '398413630149885952') {
      const embed = new Discord.RichEmbed()
        .setTitle('You win, GG! :tada: :tired_face:')
        .setDescription("To play another game, type `lmao rps <rock/paper/scissors>`!")
        .setColor(0x2471a3)

      message.channel.send({ embed });
    }
  }

  if (message.content.startsWith(prefix + " upvote")) {
    const embed = new Discord.RichEmbed()
      .setColor(0x2471a3)
      .setTitle('Want to upvote LMAOBot to access more commands and features? Click here!')
      .setURL('https://discordbots.org/bot/398413630149885952')
      .setDescription("**How do I upvote?:** You can upvote by going to my bot page and clicking that ^(number) button next to the bot\'s name!")
      .addField("Why upvote?:", "Upvoting helps the bot out a lot, having more upvotes means LMAOBot has a higher chance of being featured, and that means more people will see and want to use this bot.")

    message.channel.send({ embed });
  }

  var askargs = message.content.substring(prefix.length + 1).split(" ");
  if (message.content.startsWith(prefix + " ask")) {
    if (askargs[1] != null) {
      var random = Math.floor(Math.random() * asklist.length)
      message.channel.send(asklist[random]);
    } // if args[1], post random answer
    else {
      const embed = new Discord.RichEmbed()
        .setTitle('REEEEeeEEe!!11!!!1!')
        .setColor(0x2471a3)
        .setDescription('ar3 yu g0nna ask a questi0n?!1?!1 :rolling_eyes:')
        .setImage('https://i.imgur.com/QgOFwVW.jpg')

      message.channel.send({ embed });
    }
  }

  if (message.content.startsWith(prefix + " info")) {
    client.shard.broadcastEval('this.guilds.size').then(results => {
      const embed = new Discord.RichEmbed()
        .setTitle('LMAOBot Info and Stats')
        .setDescription("Type \'lmao invite\' to invite LMAOBot to your server or join LMAOBot's support server!")
        .addField("Servers:", `${results.reduce((prev, val) => prev + val, 0)}`, true)
        .addField("Users:", client.users.size, true)
        .addField("Donators:", "**SetoVarious#1234** | $10.00 AUD\n**Scrungo#2873** | $5.95 AUD\n**arcade T#1887** | $3.00 AUD")
        .setColor(0x2471a3)
        .setImage('http://i0.kym-cdn.com/entries/icons/mobile/000/014/178/AyyyLmao.jpg')
        .setFooter('LMAOBot developed and created by Pete#4164 and Dim#8080')

      message.channel.send({ embed });
    }
    )
  }

  if (message.content === (prefix + ' ping')) {
    message.channel.send(`P0ng!!1!11! My connection to the server is \`${Date.now() - message.createdTimestamp} ms\` :alien:`);
  }

  if (message.content.startsWith(prefix + ' help')) {
    message.channel.send({
      embed: {
        title: ':x: Prefix',
        color: 0x2471a3,
        description: "The prefix for all my commands is `lmao`, e.g: `lmao help`.",
        fields: [
          {
            name: ':tada: Fun',
            value: 'agree, dankrate, gayrate, 8ball, pun, roll, coinflip, doge, kappa, lenny, lol, megusta, pepe, sanic, spiderman, spooderman, troll, wat, dolan, notsure, alone, ask, chuck, say, magik'
          },


          {
            name: ':tools: Utilities',
            value: 'help, ping, invite, info, upvote'
          },

          {
            name: ':loud_sound: Sound Board',
            value: 'addsound, playsound, listsounds, listpopularsounds, soundinfo'
          }

        ],

        footer: {
          text: 'LMAOBot created and developed by Pete#4164 and Dim#8080.'
        }
      }
    });
  }

  var eightballargs = message.content.substring(prefix.length + 1).split(" ");
  if (message.content.startsWith(prefix + " 8ball")) { // creates the command 8ball
    if (eightballargs[1] != null) {
      var random = Math.floor(Math.random() * eightball.length)
      message.channel.send(eightball[random]);
    } // if args[1], post random answer
    else {
      const embed = new Discord.RichEmbed()
        .setTitle('REEEEeeEEe!!11!!!1!')
        .setColor(0x2471a3)
        .setDescription('ar3 yu g0nna ask a questi0n?!1?!1 :rolling_eyes:')
        .setImage('https://i.imgur.com/QgOFwVW.jpg')

      message.channel.send({ embed });
    }
  }

  var punargs = message.content.substring(prefix.length);
  if (message.content.startsWith(prefix + " pun")) { // creates the command pun
    if (punargs[1] != null) {
      var random = Math.floor(Math.random() * punlist.length)
      message.channel.send(punlist[random]);
    } // if args[1], post random answer
  }


  if (message.content === (prefix + ' agree')) {
    message.channel.send(`I agree with ${message.member.user}`);
  }

  var rollargs = message.content.substring(prefix.length);
  if (message.content.startsWith(prefix + " roll")) { // creates the command meme
    if (rollargs[1] != null) {
      var random = Math.floor(Math.random() * 100) + 1
      message.channel.send("You rolled a " + random + "!");
    } // if args[1], post random answer
  }

  var coinargs = message.content.substring(prefix.length);
  if (message.content.startsWith(prefix + " coinflip")) { // creates the command coinflip
    if (coinargs[1] != null) {
      var random = Math.floor(Math.random() * coinflips.length)
      message.channel.send("The coin landed on " + (coinflips[random]) + "!");
    } // if args[1], post random answer
  }

  if (message.content.startsWith(prefix + ' invite')) {
    message.channel.send({
      embed: {
        title: 'Invite LMAOBot to your Discord Server',
        color: 0x2471a3,
        description: 'Click [here](https://discordapp.com/oauth2/authorize/?permissions=1341643969&scope=bot&client_id=398413630149885952)! :alien:',
        fields: [{
          name: "Join LMAOBot\'s Official Discord Server",
          value: "Click [here](https://discord.gg/aQ25yFy)! :alien:"
        }]
      }
    })
  }

  if (message.content.startsWith(prefix + " pepe"))
    message.channel.send({
      files: [
        "./img/pepe.png"
      ]
    })

  if (message.content.startsWith(prefix + " doge"))
    message.channel.send({
      files: [
        "./img/doge.png"
      ]
    })

  if (message.content.startsWith(prefix + " kappa"))
    message.channel.send({
      files: [
        "./img/kappa.png"
      ]
    })

  if (message.content.startsWith(prefix + " lenny"))
    message.channel.send({
      files: [
        "./img/lenny.png"
      ]
    })

  if (message.content.startsWith(prefix + " lol"))
    message.channel.send({
      files: [
        "./img/lol.png"
      ]
    });

  if (message.content.startsWith(prefix + " megusta"))
    message.channel.send({
      files: [
        "./img/megusta.png"
      ]
    })

  if (message.content.startsWith(prefix + " sanic"))
    message.channel.send({
      files: [
        "./img/sanic.png"
      ]
    })

  if (message.content.startsWith(prefix + " spiderman"))
    message.channel.send({
      files: [
        "./img/spiderman.jpg"
      ]
    })

  if (message.content.startsWith(prefix + " spooderman"))
    message.channel.send({
      files: [
        "./img/spooderman.png"
      ]
    })

  if (message.content.startsWith(prefix + " troll"))
    message.channel.send({
      files: [
        "./img/troll.png"
      ]
    })

  if (message.content.startsWith(prefix + " wat"))
    message.channel.send({
      files: [
        "./img/wat.jpg"
      ]
    })

  if (message.content.startsWith(prefix + " dolan"))
    message.channel.send({
      files: [
        "./img/dolan.png"
      ]
    })

  if (message.content.startsWith(prefix + " notsure"))
    message.channel.send({
      files: [
        "./img/notsure.png"
      ]
    })

  if (message.content.startsWith(prefix + " alone"))
    message.channel.send({
      files: [
        "./img/alone.png"
      ]
    })

});

client.on('guildCreate', guild => {
  let defaultChannel = "";
  guild.channels.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  })
  if (!defaultChannel) return;
  //defaultChannel will be the channel object that it first finds the bot has permissions for
  const embed = new Discord.RichEmbed()
    .setTitle('Howdy folks!')
    .setDescription(`thnx veri much for inViting mi to **${guild.name}**!!1! I'm **LMAOBot**, a f4ntast1c b0t created by **Pete#4164** and **Dim#8080**! \n \nTo look at the list of my commands, type __**'lmao help'**__! \n \nHey you! yeah.. you!11! W4nt to upv0te LMAOBot to gain __***EXCLUSIVE***__ features such as upvote only commands, and a sexy role on the support server?!?!?11 You can do so by typing **'lmao upvote'** in chat! Thnx xoxo :heart: \n \nIf you're having any problems, feel free to join my support server, just type **'lmao invite'**!`)
    .setColor(0x2471a3)

  defaultChannel.send({ embed })


})

var rpslist1 = [
  "I chose `rock`!!!1!",
  "I chose `paper`!!!1!",
  "I chose `scissors`!!!1!"
]

var rpslist2 = [
  "I chose `scissors`!11!1",
  "I chose `rock`!11!1",
  "I chose `paper`!11!1"
]

var rpslist3 = [
  "I chose `paper`!!11!1",
  "I chose `scissors`!!11!1",
  "I chose `rock`!!11!1"
]

var asklist = [
  "Yes!",
  "No!"
]

client.on('ready', () => {
  client.shard.broadcastEval('this.guilds.size').then(results => {
    client.user.setActivity(`lmao help | ${results.reduce((prev, val) => prev + val, 0)} servers`);
  })
  console.log('Ready sir..');


  setInterval(async () => {
    try {
      let res = await require('snekfetch').get(`https://discordbots.org/api/bots/398413630149885952/votes?onlyids=1`)
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5ODQxMzYzMDE0OTg4NTk1MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE1NDc5MzAwfQ.fZOBCz8fBAS-24EeC0uxOwlvs6LLqKTPgW-cpBQl1Z8').query('onlyids', true)
      if (!res) return console.error('discordbots.org> Checking upvotes returned no result.')

      if (res.status == 200) {
        let body = res.body;
        let supportguild = client.guilds.get("399121674198581248");
        let role = "403490721421590529";
        console.log("discordbots.org> Checking upvotes for roles.");

        if (supportguild) {
          supportguild.members.map(member => {
            if (member.roles.has(role)) {
              if (body.indexOf(member.user.id) == -1) {
                member.removeRole(role, "Removed upvote.")
              }
            } else {
              if (body.indexOf(member.user.id) != -1) {
                member.addRole(role, "Added upvote.")
              }
            }
          });
        }
      } else {
        console.error('discordbots.org> Checking upvotes returned status code: ' + res.status)
      }
    } catch (err) {
      console.error('discordbots.org> Checking upvotes returned error: ' + err)
    }
    client.shard.broadcastEval('this.guilds.size').then(results => {
      snekfetch.post(`https://discordbots.org/api/bots/stats`)
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5ODQxMzYzMDE0OTg4NTk1MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE1NDc5MzAwfQ.fZOBCz8fBAS-24EeC0uxOwlvs6LLqKTPgW-cpBQl1Z8')
        .send({ server_count: `${results.reduce((prev, val) => prev + val, 0)}` })
        .then(() => console.log('Updated discordbots.org stats.'))
        .catch(err => console.error(`Whoops something went wrong: ${err.body}`));

      client.user.setActivity(`lmao help | ${results.reduce((prev, val) => prev + val, 0)} servers`)
    })
  }, 600000);
});

var eightball = [ // sets the answers to an eightball
  "Yes!",
  "No...",
  "Maybe.",
  "Probably.",
  "I dont think so.",
  "Never!",
  "Indeed.",
  "Certainly.",
  "There is a possibility.",
  "No way!",
  "As I see it, yes.",
  "Most likely.",
  "You may rely on it.",
  "Signs point to yes."
]

var punlist = [
  "About a month before he died, my uncle had his back covered in lard. After that, he went down hill fast.",
  "I bought some shoes from a drug dealer. I don\'t know what he laced them with, but I\'ve been tripping all day.",
  "For Halloween we dressed up as almonds. Everyone could tell we were nuts.",
  "My dad died when we couldn\'t remember his blood type. As he died, he kept insisting for us to \'be positive\', but it\'s hard without him.",
  "Atheists don't solve exponential equations because they don't believe in higher powers.",
  "What\'s the difference of deer nuts and beer nuts? Beer nuts are a $1.75, but deer nut are under a buck.",
  "The future, the present and the past walked into a bar. Things got a little tense.",
  "Atheism is a non-prophet organization.",
  "I just found out I'm colorblind. The diagnosis came completely out of the purple.",
  "I saw an ad for burial plots, and thought to myself this is the last thing I need.",
  "What do you call a dictionary on drugs? HIGH-Definition.",
  "Just burned 2,000 calories. That\'s the last time I leave brownies in the oven while I nap.",
  "What did E.T.\'s mother say to him when he got home? \'Where on Earth have you been?!\'",
  "Did you hear about the kidnapping at school? It\'s okay. He woke up.",
  "Two blondes were driving to Disneyland. The sign said, \'Disneyland Left\'. So they started crying and went home.",
  "Dr.\'s are saying not to worry about the bird flu because it\'s tweetable.",
  "Heard about the drug addict fisherman who accidentally caught a duck? Now he\'s hooked on the quack.",
  "I don't engage in mental combat with the unarmed.",
  "Oxygen is proven to be a toxic gas. Anyone who inhales oxygen will normally dies within 80 years.",
  "I ordered 2000 lbs. of chinese soup. It was Won Ton.",
  "Claustrophobic people are more productive thinking out of the box.",
  "Did you hear they banned fans from doing \'The Wave\' at all sports events? Too many blondes were drowning.",
  "A termite walks into a bar and says, \'Where is the bar tender?\'",
  "eBay is so useless. I tried to look up lighters and all they had was 13,749 matches",
  "Did you hear about the 2 silk worms in a race? It ended in a tie!",
  "What\'s the difference between a poorly dressed man on a bicycle and a nicely dressed man on a tricycle? A tire.",
  "A cop just knocked on my door and told me that my dogs were chasing people on bikes. My dogs don\'t even own bikes...",
  "I was addicted to the hokey pokey... but thankfully, I turned myself around.",
  "Why do the French eat snails? They don\'t like fast food."
]

var randomnumber = Math.floor(Math.random() * 101);

var coinflips = [
  "heads",
  "tails"
]

client.login(process.env.TOKEN);