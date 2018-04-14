const Sequelize = require('sequelize');
const Discord = require('discord.js');

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
    name: 'removecoins',
    aliases: ['rcoins', '-c', 'rc', '-$'],
    description: "remove someone\'s coins.",
    dev_only: true,  
    args: {
      req: true,
      min: 2
    },
    usage: '<id> <amount>',
    run: async (client, command, msg, args) => {
      try {
        const user = await userInfo.findOne({
          where: {
            id: args[0]
          },
        })
        if(!user) return msg.channel.send(`:x: User not found!`)
        if(args[1] <= 0) return msg.channel.send({embed: {
          color: 0x2471a3,
          description: "Nice try bro, you can\'t remove less than 1 coin."
        }});
        if(args[1].includes(".")) return msg.channel.send({embed : {
          color: 0x2471a3,
          description: "fek off kid, stop trying to break me. You can only remove whole dank coins."
      }});
        user.decrement('coins', {by: args[1]});
        msg.channel.send(`:white_check_mark: **${args[1]}** dank coins removed.`)
      } catch(err) {
        console.log("An exception occured while removing dank coins! Error: ", err)
        msg.channel.send(":x: an exception occured!");
      }
    }
  }