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
    name: 'search',
    description: "Scavenge for coins.",

    // Function

    run: async (client, command, msg, args) => {
        const user = await userInfo.findOne({
            where: {
              id: msg.author.id,
            }
          });

        var random = Math.random();
        if(random < 0.4) { // no coins (40% chance)
            return msg.channel.send({embed: {
                color: 0x2471a3,
                title: `${msg.author.username} searches through his couch for dank coins..`,
                description: `Oh no, you found **0** dank coins. Better luck next time. :cry:`
            }});
        } 
        if(random < 0.6) { // 1 coins (20% chance)
            msg.channel.send({embed: {
                color: 0x2471a3,
                title: `${msg.author.username} searches through his couch for dank coins..`,
                description: `You found **5** dank coins, GG ez. :tada:`
            }});
            return user.increment('coins', {by: 1})
        } 
        if(random < 0.8) { // 3 coins (20% chance)
            msg.channel.send({embed: {
                color: 0x2471a3,
                title: `${msg.author.username} searches through his couch for dank coins..`,
                description: `You found **10** dank coins. Nice. :tada:`
            }});
            return user.increment('coins', {by: 3})
        } 
        if(random <= 0.99) { // 8 coins (19% chance)
            msg.channel.send({embed: {
                color: 0x2471a3,
                title: `${msg.author.username} searches through his couch for dank coins..`,
                description: `wew, you found **35** dank coins. Save some for me yeah? :tada:`
            }});
            return user.increment('coins', {by: 8})
        } 
        if(random == 1) { // 200 coins (1% chance)
            msg.channel.send({embed: {
                color: 0x2471a3,
                title: `${msg.author.username} searches through his couch for dank coins..`,
                description: `GG, you found **100** dank coins. How are you so lucky? :tada:`
            }});
            return user.increment('coins', {by: 100})
        }
    }
}