'use strict'

const R = require('ramda')
const requireDir = require('require-dir')
const shuffle = require('./utils/shuffle')

class DataStore {

    constructor () {
        this.files = requireDir('./Lists')
        this.items = this.files.notes.items
        this.shuffled = shuffle(this.items)
    }

    getItemsList () {
        return Object.keys(this.files)
    }

    selectItem (itemName) {
        itemName = itemName || this.getItemsList()[0]
        const selected = this.files[itemName]
        this.items = selected.items
        this.shuffled = shuffle(this.items)
        return selected
    }

    getNextItem () {
        if (this.shuffled.length == 0) {
            this.shuffled = shuffle(this.items)
        }
        var nextItem = R.take(1, this.shuffled)
        this.shuffled = R.drop(1, this.shuffled)
        return nextItem
    }
}

module.exports = DataStore
