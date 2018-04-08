module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/troll.png"
        ]
      })
}

module.exports.help = {
    name: "troll"
}