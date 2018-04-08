module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/wat.jpg"
        ]
      })
}

module.exports.help = {
    name: "wat"
}