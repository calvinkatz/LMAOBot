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
    name: 'balance',
    aliases: ['coins', 'b', 'c', '$'],
    description: "View how much coins are in your balance!",

    // Function

    run: async (client, command, msg, args) => {
        const user = await userInfo.findOne({
            where: {
              id: msg.author.id,
            }
          });

        const embed = new Discord.RichEmbed()
        .setTitle(`You have ${Math.round(user.coins)} dank coins.`)
        .setDescription("To get a free 200 dank coins, type `lmao daily`!\nVoting [here](https://discordbots.org/bot/lmaobot/vote) every 24hrs will give you an extra 600 dank coins every time you use the daily command.")
        .setColor(0x2471a3);

        msg.channel.send(embed);
    }
}