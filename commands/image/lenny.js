module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/lenny.png"
        ]
      })
}

module.exports.help = {
    name: "lenny"
}