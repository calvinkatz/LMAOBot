const coinflips = [
    "heads",
    "tails"
  ]
  const prefix = "lmao";
module.exports.run = (client, message, args) => {
    var coinargs = message.content.substring(prefix.length);
    if (coinargs[1] != null ){
        var random = Math.floor(Math.random() *  coinflips.length)
        message.channel.send("The coin landed on " + (coinflips[random]) + "!");
        }
}

module.exports.help = {
    name: "coinflip"
}