// Import anything and everything required throughout the project
// *****************************************************************************
const Discord = require('discord.js');
// const snekfetch = require('snekfetch');
const ytdl = require('ytdl-core');
const Util = require('discord.js');
const Sequelize = require('sequelize');
const fs = require('fs');
const https = require('https');
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL);
process.on('unhandledRejection', console.error);


// Setup Discord.js Client/Bot
// *****************************************************************************
const client = new Discord.Client({
  disabledEvents: ['TYPING_START'],
});

// Setup Client's configuration
client.config = require('./configs/bot.json');
client.cooldowns = new Discord.Collection();

// Setup Client's commands
client.commands = new Discord.Collection();
const command_folders = fs.readdirSync('./commands');
for (const folder of command_folders) {
  const command_files = fs.readdirSync(`./commands/${folder}`);
  for (const file of command_files) {
    if (file.split('.').pop() === 'js') {
      const command = require(`./commands/${folder}/${file}`);
      command.category = folder;
      client.commands.set(command.name, command);
    }
  }
}


// Setup Client's custom function
// *****************************************************************************


/**
 * Check wheter given user ID belongs to a bot's developer.
 * @param {Integer} [id] User's ID.
 * @return {Boolean} True if it's a developer's id; false, if it's not.
 */
client.is_developer = (id) => {
  return client.config.developer_ids.indexOf(id) > -1
};


// Setup SQL database conneciton
// *****************************************************************************
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sql',
});

const currencyDB = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'currencysystem.sql',
});


// Setup Sound manager
// *****************************************************************************
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

// Setup Currency System manager
// *****************************************************************************
const userInfo = currencyDB.define('userinfo', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  coins: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  cmdsrun: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  lastdaily: Sequelize.STRING,
  user_name: Sequelize.STRING,
});

// Setup Client's events handlers
// *****************************************************************************
client.on('ready', () => {
  // Setup Sound and Currency system
  Sounds.sync();
  userInfo.sync();

  // Setup Bot
  client.shard.broadcastEval('this.guilds.size').then(results => {
    client.user.setActivity(`${client.config.prefix} help | ${results.reduce((prev, val) => prev + val, 0)} servers`);
  });

  console.log('Ready sir...');

  setInterval(async () => {
//     try {
//         let supportguild = client.shard.broadcastEval('client.guilds.get("399121674198581248")');
//         let role = "403490721421590529";
//         console.log("discordbots.org> Checking upvotes for roles.");
//         if(!supportguild) return console.log("discordbots.org> Error: Could not find supportguild");

//           supportguild.members.map(member => {
//             if (member.roles.has(role)) {
//               if (dbl.hasVoted(member.user.id) == false) {
//                 member.removeRole(role, "Removed upvote.")
//               }
//             } else {
//               if (dbl.hasVoted(member.user.id) == true) {
//                 member.addRole(role, "Added upvote.")
//               }
//             }
//           });

//     } catch (err) {
//       console.error('discordbots.org> Checking upvotes returned error: ' + err)
// }
    
    client.shard.broadcastEval('this.guilds.size').then(results => {
      dbl.postStats(results.reduce((prev, val) => prev + val, 0));
      console.log("Updated discordbots.org stats.");
      // snekfetch.post('https://discordbots.org/api/bots/stats')
      //   .set('Authorization', process.env.DBL)
      //   .send({
      //     server_count: `${results.reduce((prev, val) => prev + val, 0)}`,
      //   })
      //   .then(() => console.log('Updated discordbots.org stats.'))
      //   .catch(err => console.error(`Whoops something went wrong: ${err.body}`));

      client.user.setActivity(`${client.config.prefix} help | ${results.reduce((prev, val) => prev + val, 0)} servers`);
    });
  }, 600000);
});

client.on('message', msg => {
  if (!msg.content.startsWith(client.config.prefix) || msg.author.bot) return;

  // Cache data to userInfo database.
  try {
    const userinf = await userInfo.create({
      id: msg.author.id,
      user_name: `${msg.author.username}#${msg.author.discriminator}`,
    });
    
  } catch (err) {
    if (err.name !== 'SequelizeUniqueConstraintError') console.log(`Got an error: ${err}`);
  }

  const finduser = await userInfo.findOne({
    where: {
      id: msg.author.id,
    }
  });

  if(finduser) {
    finduser.increment('cmdsrun');
  }

  // Convert input into command name & args
  const args = msg.content.slice(client.config.prefix.length + 1).split(/ +/);
  const command_name = args.shift().toLowerCase();

  // Find a command by it's name or aliases
  const command = client.commands.get(command_name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name));
  if (!command) return;

  // Check that command arguments requirements are met
  if ('args' in command && command.args.req && command.args.min > args.length) {
    return msg.channel.send(`You didn't provide the required arguments!\nUsage: \`${client.config.prefix} ${command.name} ` + ('usage' in command ? command.usage : '') + '`');
  }

  // Check whether it's a developer only command
  if ('dev_only' in command && command.dev_only && !client.is_developer(msg.author.id)) {
    return msg.channel.send({
      embed: {
        color: 0x2471a3,
        title: ':x: Access Denied!!!',
        description: 'Nice try, but only **Bot Developers** can run this command!',
      },
    });
  }

  // Check whether it's a guild only command
  if ('guild_only' in command && command.guild_only && msg.channel.type !== 'text') {
    return msg.channel.send({
      embed: {
        color: 0x2471a3,
        title: ':x: Server Command!!!',
        description: 'I can only execute that command inside **Servers**!',
      },
    });
  }

  // Check whether command is on cooldown for user
  if ('cooldown' in command && command.cooldown >= 1) {
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldown = (command.cooldown || 1) * 1000;

    if (!timestamps.has(msg.author.id)) {
      timestamps.set(msg.author.id, now);
      return setTimeout(() => timestamps.delete(msg.author.id), cooldown);
    } else if (now < timestamps.get(msg.author.id) + cooldown) {
      return msg.channel.send({
        embed: {
          color: 0x2471a3,
          title: ':x: Command On Cooldown!!!',
          description: 'Please wait ' + (now - timestamps.get(msg.author.id)) / 1000 + ` second(s) before reusing the \`${command.name}\` command.`,
        },
      });
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldown);
  }


  try {
    command.run(client, command, msg, args);
  } catch (error) {
    console.error(error);
    msg.channel.send('There was an error in trying to execute that command!');
  }
});

client.on('userUpdate', async () => {
  try {
    const updateuser = await userInfo.update({ username: `${msg.author.username}#${msg.author.discriminator}` }, { where: { id: msg.author.id } });
  } catch (err) {
    console.log(`An error occured: ${err}`);
  }
});

client.on('guildCreate', guild => {
  // Get channel in which bot is allowed to msg
  const default_channel = guild.channels.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_msgS'));
  if (!default_channel) return;

  default_channel.send({
    embed: {
      color: 0x2471a3,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL,
      },
      title: 'Howdy folks!',
      url: 'https://discord.js.org/#/',
      description: `Thnx veri much for inViting mi to **${guild.name}**!!1! I'm **LMAOBot**, a f4ntast1c b0t developed by *${client.config.developers.join(', ')}*! \n \nTo look at the list of my commands, type __**'${client.config.prefix} help'**__! \n \nHey you! yeah.. you!11! W4nt to upv0te LMAOBot to gain __***EXCLUSIVE***__ features such as upvote only commands, and a sexy role on the support server?!?!?11 You can do so by typing **'${client.config.prefix} upvote'** in chat! Thnx xoxo :heart: \n \nIf you're having any problems, feel free to join my support server [here](${client.config.support_server})!`,
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: client.config.embed.footer,
      },
    },
  });
});

client.login(process.env.TOKEN);