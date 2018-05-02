const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Dead Meme', 'Memetastic'];
const Attack = require('./Attack.js')
class Meme {

    /**
     * Creates instance of Meme.
     *
     * @constructor
     * @this {Meme}
     * @param {string} name Specify the name of the meme.
     * @param {string} img Specify the location of the image of this meme. (from commands/meme wars)
     * @param {number} rarity Specify the rarity of the Meme.
     * @param {[Attack]} attacks Specify the attacks of the meme.
     */
    constructor(name = null, img = null, rarity = null, attacks = null, hp = null) {
        this.name = name;
        this.img = img;
        this.rarity = rarity;
        this.attacks = attacks;
        this.health = hp;
    }

    getRarityName() {
        return rarities[this.rarity];
    }

    getFullName() {
        return `${rarities[this.rarity]} ${this.name}`;
    }

    /**
     * Parses JSON into Meme object
     *
     * @this {Meme}
     * @param {json} json 
     */
    parse(json) {
        this.name = json.name;
        this.img = json.img;
        this.rarity = json.rarity;
        this.attacks = []
        json.attacks.forEach(element => {
            this.attacks.push((new Attack).parse(element));
        }); 
        this.health = json.health;
        return this;
    }
}

module.exports = Meme;