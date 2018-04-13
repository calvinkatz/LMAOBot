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
    name: 'roulette',
    aliases: [],
    description: "Play roulette!",
    usage: '<green|red|black> <bet>',

    // Function
    run: async (client, command, msg, args) => {
      client.config = require('../../configs/bot.json');
      const user = await userInfo.findOne({
        where: {
          id: msg.author.id,
        }
      });

      const incorrectUsageEmbed = new Discord.RichEmbed()
      .setTitle(":x: Incorrect Usage")
      .setDescription(`**How to play:**\n*${client.config.prefix} roulette <black|red|green> <bet amount>*\n\n**Multipliers:**\nRed: **2x** Multiplier on win -  49.5% chance win.\nBlack: **2x** Multiplier on win -  49.5% chance win.\nGreen: **14x** Multiplier on win - 1% chance win.`)
      .setColor(0xff0000);
      if(!args[0] && !args[1]) return msg.channel.send(incorrectUsageEmbed);
      var bet = Math.round(parseInt(args[1]));
      var colour = args[0].toLowerCase();
      if(colour != "green" && colour != "red" && colour != "black") return msg.channel.send(incorrectUsageEmbed);

      if(bet > user.coins) return msg.channel.send(`You don't have enough coins to gamble that much! You need ${bet - user.coins} more!`);
      if(!bet) return msg.channel.send(`Incorrect arguments! You must enter a number!`);
      if(args[1] <= 0) return msg.channel.send({embed: {
        color: 0x2471a3,
        description: "Nice try bro, you can\'t bet less than 1 coin."
      }});
      if(args[1].includes(".")) return msg.channel.send({embed : {
        color: 0x2471a3,
        description: "fek off kid, stop trying to break me. You can only bet whole dank coins."
    }});

      const embed = new Discord.RichEmbed()
      .setTitle(`Roulette`)
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setTimestamp();

      user.decrement('coins', {by: bet})

      var chance = Math.random();
      if(chance > 0.99) { // GREEN
        embed.setColor('#00ff00').addField("Rolled a:", "Green");
        if(colour != "green") {
          embed.setDescription(`Uh oh, you lost **${bet}** dank coins.`).addField("Bet:", bet, true).addField("New Balance:", `${user.coins - bet} dank coins.`);
        } else {
          embed.setDescription(`Woweeee! You lucky baSTard, you won **${bet * 14}** dank coins back!`).addField("Bet:", bet, true).addField("New Balance:", `${user.coins + bet * 14} dank coins.`);
          user.increment('coins', {by: bet * 14})
        }
      } else if (chance > 0.50) { // RED
          embed.setColor('#ff0000').addField("Rolled a:", "Red");
        if(colour != "red") {
          embed.setDescription(`Uh oh, you lost **${bet}** dank coins.`).addField("Bet:", bet, true).addField("New Balance:", `${user.coins - bet} dank coins.`);
        } else {
          embed.setDescription(`GG, you won **${bet * 2}** dank coins back!`).addField("Bet:", bet, true).addField("New Balance:", `${user.coins + bet * 2} dank coins.`);
          user.increment('coins', {by: bet * 2})
        }
      } else { // black
        embed.setColor('#000000').addField("Rolled a:", "Black", true);
        if(colour != "black") {
          embed.setDescription(`Uh oh, you lost **${bet}** dank coins.`).addField("Bet:", bet, true).addField("New Balance:", `${user.coins - bet} dank coins.`);
        } else {
          embed.setDescription(`GG, you won **${bet * 2}** dank coins back!`).addField("Bet:", bet, true).addField("New Balance:", `${user.coins + bet * 2} dank coins.`);
          user.increment('coins', {by: bet * 2})
        }
      }
      msg.channel.send(embed);

    }
  }