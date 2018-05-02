const Meme = require('./Meme.js');

/**
 * A Class for storing Memewars inventory inside a sequelize database.
 * 
 * @class Inventory
 * @author: NumerX
 */
class Inventory {

    /**
     * @constructor
     * @constructs new Inventory
     * @this {Inventory}
     * @param {[Meme]} memes An array of memes.
     * @param {[string]} titles An array of titles.
     */
    constructor(memes = null, titles = null, selectedMeme = 0, selectedTitle = 0) {
        this.memes = memes;
        this.titles = titles;
        this.selectedMeme = selectedMeme;
        this.selectedTitle = selectedTitle;
    }

    /**
     * Parses JSON into Inventory object
     *
     * @this {Inventory}
     * @param {json} json
     */
    parse(json) {
        this.memes = [];
        json.memes.forEach(element => {
            this.memes.push((new Meme).parse(element))
        });
        this.titles = json.titles;
        this.selectedMeme = json.selectedMeme;
        this.selectedTitle = json.selectedTitle;
        return this;
    }

    getSelectedMeme() {
        return this.memes[this.selectedMeme];
    }
    getSelectedTitle() {
        return this.titles[this.selectedTitle];
    }


}

module.exports = Inventory;