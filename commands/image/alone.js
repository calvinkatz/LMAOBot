module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/alone.png"
        ]
      })
}

module.exports.help = {
    name: "alone"
}