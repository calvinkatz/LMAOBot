/**
 * Attack class. Memes can have up to 4 of these.
 *
 * @author: NumerX
 */
class Attack {

    /**
     * Creates instance of Attack
     *
     * @constructor
     * @this {Attack}
     * @param {string} name Specify the name of the attack.
     * @param {number} damage Specify how much damage the attack does.
     * @param {number 0-1} chance Specify the chance of the attack hitting.
     */
    constructor(name = null, damage = null, chance = null) {
        this.name = name;
        this.damage = damage;
        this.chance = chance;
    }

    /**
     * Returns if attack hit.
     * @returns {boolean} True if attack hit, else it's false.
     */
    attackHit() {
        return Math.random() > this.chance;
    }

    /**
     * Parses JSON into Meme object
     *
     * @this {Meme}
     * @param {json} json 
     */
    parse(json) {
        this.name = json.name;
        this.damage = json.damage;
        this.chance = json.chance;
        return this;
    }
}

module.exports = Attack;