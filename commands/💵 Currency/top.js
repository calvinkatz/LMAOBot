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
    name: 'top',
    description: "Look at the top 10 richest people.",

    // Function

    run: async (client, command, msg, args) => {
        const top10 = await userInfo.findAll({
            attributes: ['user_name', 'coins'],
            order: [
                ['coins', 'DESC'],
            ],
            limit: 10,
        });

        const topString = top10.map(t => `:trophy: ${t.coins} - ${t.user_name}`).join("\n") || ":x: There are no users currently on the leaderboard!";
        msg.channel.send({embed: {
            color: 0x2471a3,
            title: "Top 10 Richest Users",
            description: topString,
        }});
    }
}