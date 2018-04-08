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
process.on('unhandledRejection', console.error)

client.commands = new Discord.Collection();

fs.readdir('./commands/utility', (err, files) => {
  if(err) console.error(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles <= 0) return console.log("There are no utility commands to load!");

  console.log(`Loading ${jsFiles.length} utility commands.`)

  jsFiles.forEach((f, i) => {
      let props = require(`./commands/utility/${f}`);
      client.commands.set(props.help.name, props);
  });
});

fs.readdir('./commands/fun', (err, files) => {
  if(err) console.error(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles <= 0) return console.log("There are no fun commands to load!");

  console.log(`Loading ${jsFiles.length} fun commands.`)

  jsFiles.forEach((f, i) => {
      let props = require(`./commands/fun/${f}`);
      client.commands.set(props.help.name, props);
  });
});

fs.readdir('./commands/image', (err, files) => {
  if(err) console.error(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles <= 0) return console.log("There are no image commands to load!");

  console.log(`Loading ${jsFiles.length} image commands.`)

  jsFiles.forEach((f, i) => {
      let props = require(`./commands/image/${f}`);
      client.commands.set(props.help.name, props);
  });
});

fs.readdir('./commands/sound', (err, files) => {
  if(err) console.error(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles <= 0) return console.log("There are no sound commands to load!");

  console.log(`Loading ${jsFiles.length} sound commands.`)

  jsFiles.forEach((f, i) => {
      let props = require(`./commands/sound/${f}`);
      client.commands.set(props.help.name, props);
  });
});

fs.readdir('./commands/admin', (err, files) => {
  if(err) console.error(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles <= 0) return console.log("There are no admin commands to load!");

  console.log(`Loading ${jsFiles.length} admin commands.`)

  jsFiles.forEach((f, i) => {
      let props = require(`./commands/admin/${f}`);
      client.commands.set(props.help.name, props);
  });
});

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

client.once('ready', () => {
	Sounds.sync();
});

client.on('message', message => {

	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const input = message.content.slice(prefix.length + 1).split(' ');
	const command = input.shift();
  const args = input.join(' ');

  let cmd = client.commands.get(command); //let cmd = client.commands.get(command.slice(prefix.length));
   if(cmd) cmd.run(client, message, args)

});

client.on('guildCreate', guild => {
  let defaultChannel = "";
  guild.channels.forEach((channel) => {
    if(channel.type == "text" && defaultChannel == "") {
      if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
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

  defaultChannel.send({embed})

 
})

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
    
          if(res.status == 200) {
            let body = res.body;
            let supportguild = client.guilds.get("399121674198581248");
            let role = "403490721421590529";
            console.log("discordbots.org> Checking upvotes for roles.");
    
            if(supportguild) {
              supportguild.members.map(member => {
                  if(member.roles.has(role)) {
                    if(body.indexOf(member.user.id) == -1) {
                      member.removeRole(role, "Removed upvote.")
                    }
                  } else {
                    if(body.indexOf(member.user.id) != -1) {
                      member.addRole(role, "Added upvote.")
                    }
                  }
              });
            }
          } else {
            console.error('discordbots.org> Checking upvotes returned status code: ' + res.status)
          }
        } catch(err) {
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

client.login(process.env.TOKEN);

