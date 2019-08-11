'use strict'

const { ipcRenderer } = require('electron')

document
    .getElementById('nexItemBtn')
    .addEventListener('click', () => {

        ipcRenderer.send('getNextItem');
    })

const itemSelected = (event) => {
    ipcRenderer.send('selectItem', event.target.textContent)
}

ipcRenderer
    .on('updateListMenu', (event, list) => {

        const menu = document.getElementById('listMenu')

        var content = '<li class="divider" data-content="FretWiz"></li>'
        list.forEach(element => {
            content += `<li class="menu-item">` +
                `<a href="#${element}">` +
                    `<i class="icon icon-link"></i>${element}` +
                `</a>` +
            `</li>`
        })

        menu.innerHTML = content

        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', itemSelected)
        })
    })

ipcRenderer
    .on('itemSelected', (event, item) => {

        document
            .getElementById('item-name')
            .innerHTML = item.name || 'No name'

        document
            .getElementById('instructions')
            .innerHTML = item.instructions || 'N/A'

        document
            .getElementById('currentItem')
            .innerHTML = ''
    })

ipcRenderer
    .on('nextItem', (event, item) => {

        document
            .getElementById('currentItem')
            .innerHTML = `<p>${item}</p>`
    })
