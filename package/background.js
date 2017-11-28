chrome.runtime.onInstalled.addListener(function(object) {
    // show options screen on install
    if (chrome.runtime.OnInstalledReason.INSTALL === object.reason) {
        chrome.runtime.openOptionsPage();
    }
});


function showIconForTab(tab) {
    if (tab.url.includes("tenhou.net")) {
      chrome.pageAction.show(tab.id);
    }
}

function iconsAcrossTabs(tabs) {
    for (let tab of tabs) {
      showIconForTab(tab);
    }
}

chrome.tabs.query({ url: '*://tenhou/net/*' }, iconsAcrossTabs)

chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    showIconForTab(tab);
});

let tileset = 'DEFAULT';
let sprites;

function getTileset() {
    if (tileset === 'DEFAULT') return;
    // Prepare custom tile sprites
    sprites = new Array(5);
    for (let i = 0; i < 5; i++) {
        sprites[i] = new Image();
        sprites[i].src = chrome.runtime.getURL('sprites.' + tileset + '/' + i + '.png');
    }
}

getTileset(tileset);

// listen for messages about the user's preferred tileset, sent from the options form
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    switch (request.greeting) {
        case 'tileset':
            tileset = request.tileset;
            getTileset(tileset);
            break;
    }
});

// Replace tile sprite sheets with custom sprite sheets
chrome.webRequest.onBeforeRequest.addListener(details => {
    /**
     * Group 1: Width of image
     * Group 2: Sprite ID
     * Group 3: Colour code
     */
    const spriteUrlRegex = /view([0-9]{3})([0-9])([0-9a-f]{20})\.png$/;
    const matches = spriteUrlRegex.exec(details.url);
    if (tileset === 'DEFAULT' || !matches || !sprites) return;
    
    const id = parseInt(matches[2]);
    if (sprites[id]) {
        const width = 10 * parseInt(matches[1]);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = tileSheetHeightLookup[id][width];
        const canvas2d = canvas.getContext('2d');
        canvas2d.clearRect(0, 0, width + 1, canvas.height + 1);
        canvas2d.drawImage(sprites[id], 0, 0, width, canvas.height);
        return { redirectUrl: canvas.toDataURL() };
    }
}, {
    urls: ['*://p.mjv.jp/5/img/view*'],
    types: ['image'],
}, ["blocking"]);
