const Discord = require('discord.js');
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL);
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
    name: 'daily',
    description: "Receive your daily coins!",

    // Function

    run: async (client, command, msg, args) => {

      var user = await userInfo.findOne({
        where: {
          id: msg.author.id,
        }
      });

      const timenow = Math.round((new Date()).getTime() / 1000)
      if((timenow - user.lastdaily) > 60*60*24) {
         await dbl.hasVoted(msg.author.id).then(results => {
           if(results == false) return;
          user.increment('coins', { by: 600 });
         })
          user.increment('coins', { by: 200 });
          var userupdated = await userInfo.findOne({
            where: {
              id: msg.author.id,
            }
          });
          const dailyembed = new Discord.RichEmbed()
          .setDescription(`Here you go.. don't spend it all straight away!`)
          .addField("Old Balance", user.coins, true)
          .addField("New Balance", userupdated.coins, true)
          .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
          .setTimestamp()
          .setColor(0x2471a3);
          msg.channel.send(dailyembed);
         try {
          const updateuser = await userInfo.update({ lastdaily: timenow }, { where: { id: msg.author.id } });
         } catch (err) {
           console.log(`An error occured: ${err}`);
         }


      } else {
        var date = new Date(null);
        date.setSeconds(24*60*60 - (timenow - user.lastdaily));
        var result = date.toISOString().substr(11, 8);
        const embed = new Discord.RichEmbed()
        .setDescription(`Calm down bro, money doesn't grow on trees. Time remaining: **${result}**`)
        .setColor(0x2471a3);
        msg.channel.send(embed);
      }

    }
}