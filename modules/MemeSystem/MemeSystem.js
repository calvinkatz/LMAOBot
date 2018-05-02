const Meme = require('./Meme.js');
const Attack = require('/Attack.js');
const Inventory = require('./Inventory.js');

module.exports.defaultMeme = new Meme('Dorito', '../../modules/MemeSystem/Images/common/dorito.png', 0, [new Attack()]);
module.exports.Inventory = Inventory;
module.exports.Meme = Meme;
module.exports.Attack = Attack;