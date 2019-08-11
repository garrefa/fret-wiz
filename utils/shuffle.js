'use strict'

const shuffle = (list) => {
    // default random function
    const random = Math.random
    let m = list.length, t, i,
        // work on clone of the list
        listout = list.slice(0)

    // work from end to beginning of the list
    // 'shuffled' elements start filling from the back
    while (m) {
        // select index of a non-shuffled element
        i = Math.floor(random() * m--)
        // shuffle the elements by swapping them
        t = listout[m]
        listout[m] = listout[i]
        listout[i] = t
    }
    return listout
}

module.exports = shuffle
