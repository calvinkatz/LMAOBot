module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/kappa.png"
        ]
      })
}

module.exports.help = {
    name: "kappa"
}