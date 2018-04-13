const Discord = require('discord.js');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5ODQxMzYzMDE0OTg4NTk1MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTIzMzMxNjMxfQ.IkPUhi4Pqj7SrBiF6Qg-wDum5qsGg9HVH08B1O6i0kU');
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
    name: 'send',
    description: "Send coins to your mates.",
    aliases: ['sendcoins'],
    usage: "@<username> <coins>",
    // Requirements
    args: {
        req: true,
        min: 2,
    },
    // Function
    run: async (client, command, msg, args) => {
        if(!msg.mentions.users.first()) return msg.channel.send("You need to tag a person to send coins to!");
        const userID = msg.mentions.users.first().id;
        const urmate = await userInfo.findOne({
            where: {
              id: userID,
            }
          });

          if(!urmate) return msg.channel.send({embed: {
            color: 0x2471a3,
            description: `I searched everywhere, but couldn't find user **${msg.mentions.users.first().username}**, they either don't exist, haven't used a command yet, or they're a bot.`
          }});

          const user = await userInfo.findOne({
            where: {
              id: msg.author.id,
            }
          });
          let bet = parseInt(args[1]);
          if(!bet) return msg.channel.send({embed: {
            color: 0x2471a3,
            description: "You need to enter the amount in coins in numbers, not letters!"
        }});
          if(args[1] <= 0) return msg.channel.send({embed: {
            color: 0x2471a3,
            description: "Nice try bro, you can\'t send less than 1 coin to a user."
          }});
          if(args[1].includes(".")) return msg.channel.send({embed : {
            color: 0x2471a3,
            description: "fek off kid, stop trying to break me. You can only send whole coins to others."
        }});
          if(Math.round(user.coins) < args[1]) return msg.channel.send({embed : {
              color: 0x2471a3,
              description: "You\'re too poor to send that amount of dank coins kid.\nEarn some by typing `lmao daily` or test your luck with `lmao gamble`."
          }});
          if(urmate.id == msg.author.id) return msg.channel.send({embed: {
              color: 0x2471a3,
              description: "nice try bro, you can't send coins to yourself."
          }});
          urmate.increment('coins', { by: args[1] });
          user.decrement('coins', { by: args[1]});
          msg.channel.send(`Sent ${args[1]} dank coins to **${msg.mentions.users.first().username}**!`)
        }
}