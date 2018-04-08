module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/notsure.png"
        ]
      })
}

module.exports.help = {
    name: "notsure"
}