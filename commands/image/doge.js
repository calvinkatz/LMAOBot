module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/doge.png"
        ]
      })
}

module.exports.help = {
    name: "doge"
}