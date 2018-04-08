module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/spooderman.png"
        ]
      })
}

module.exports.help = {
    name: "spooderman"
}