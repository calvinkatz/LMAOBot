const Discord = require('discord.js');
const Sequelize = require('sequelize');

const currencyDB = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'currencysystem.sql',
});

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

module.exports = {
    // Information
    name: 'gamble',
    aliases: [],
    description: "Gamble your money!",
    usage: '<amount in coins to gamble>',
    args: {
      req: true,
      min: 1,
    },

    // Function
    run: async (client, command, msg, args) => {
      const user = await userInfo.findOne({
        where: {
          id: msg.author.id,
        }
      });

      var bet = Math.round(parseInt(args[0]));

      const embed = new Discord.RichEmbed()
      .setTitle(`Gamble`)
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setTimestamp();

      if(args[0].includes(".")) return msg.channel.send({embed : {
        color: 0x2471a3,
        description: "fek off kid, stop trying to break me. You can only bet whole dank coins."
    }});
      if(args[0] > user.coins) return msg.channel.send({embed: {
        color: 0x2471a3,
        description: `You don't have enough dank coins to gamble that much! You need **${args[0] - user.coins}** more!`
      }});
      if(args[0] <= 0) return msg.channel.send({embed: {
        color: 0x2471a3,
        description: "Nice try bro, you can\'t bet less than 1 coin."
      }});
      if(!bet) return msg.channel.send({embed: {
        color: 0x2471a3,
        description: "**Incorrect arguments**\nYou must enter a number!"
      }});

      await user.decrement('coins', {by: bet});

        var chance = Math.random();
      if(chance < 0.6) {
        embed.setDescription(`Uh oh, you lost **${bet}** dank coins. :cry:`).setColor('#ff0000').addField("New Balance", `**${user.coins - bet}** dank coins.`);
      } else {
        await user.increment('coins', { by: bet * 2});
        embed.setDescription(`Yay, you won **${bet * 2}** dank coins back! :tada:`).setColor('#66ff33').addField("New Balance", `**${(bet * 2) + user.coins}** dank coins.`);
      }

      msg.channel.send(embed);

    }
  }