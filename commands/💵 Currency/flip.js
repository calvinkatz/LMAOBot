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
    name: 'flip',
    description: "Flip a coin.",
    aliases: ['flipcoin', 'fc'],
    usage: "<heads/tails> <coins>",
    // Requirements
    args: {
        req: true,
        min: 2,
    },
    // Custom Data
        responses: [
        "heads",
        "tails",
    ],
    // Function
    run: async (client, command, msg, args) => {
        if(args[0] !== "heads" && args[0] !== "tails") return msg.channel.send({embed: {
            title: ":x: Incorrect Usage",
            description: "You need to enter either heads or tails!",
            color: 0xff0000,
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
          user.decrement('coins', {by: args[1]});
          if(user.coins < args[1]) return msg.channel.send({embed : {
            color: 0x2471a3,
            description: "You\'re too poor to bet that amount of dank coins kid.\nEarn some by typing `lmao daily`."
        }});
        if(args[1] <= 0) return msg.channel.send({embed: {
            color: 0x2471a3,
            description: "Nice try bro, you can\'t bet less than 1 coin."
          }});
          if(args[1].includes(".")) return msg.channel.send({embed : {
            color: 0x2471a3,
            description: "fek off kid, stop trying to break me. You can only bet whole dank coins."
        }});
          const random = command.responses[Math.floor(Math.random() * command.responses.length)];
          const winCoins = Math.round(args[1] * 1.80);
          if(args[0] = "heads") {
            if(random == "tails") {
                return msg.channel.send({embed: {
                    color: 0x2471a3,
                    description: `The coin landed on tails. You lost ${args[1]} dank coins, RIP. :cry:`
                }});
            }
            if(random == "heads") {
                msg.channel.send({embed: {
                    color: 0x2471a3,
                    description: `The coin landed on heads. You won back ${winCoins} dank coins! :tada:`
                }});
                return user.increment('coins', {by: winCoins});
            }
          }
          if(args[0] = "tails") {
            if(random == "heads") {
                return msg.channel.send({embed: {
                    color: 0x2471a3,
                    description: `The coin landed on tails. You lost ${args[1]} dank coins, RIP. :cry:`
                }});
                
            }
            if(random == "tails") {
                msg.channel.send({embed: {
                    color: 0x2471a3,
                    description: `The coin landed on tails. You won back ${winCoins} dank coins! :tada:`
                }});
                return user.increment('coins', {by: winCoins});
            }
          }
        }
}