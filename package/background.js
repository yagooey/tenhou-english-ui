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

let sprites = new Array(5);
for (let i = 0; i < 5; i += 1) {
    getImageDataURL(chrome.runtime.getURL('sprites/' + i + '.png'))
        .then(newSprite => sprites[i] = newSprite);
}

chrome.webRequest.onBeforeRequest.addListener((details) => {
    /**
     * Group 1: Width of image
     * Group 2: Sprite ID
     * Group 3: Colour code
     */
    const spriteUrlRegex = /view([0-9]{3})([0-9])([0-9a-f]{20})\.png$/;
    const matches = spriteUrlRegex.exec(details.url);
    if (matches) {
        const id = parseInt(matches[2]);
        if (!isNaN(id) && sprites[id]) {
            const width = parseInt(matches[1]);
            return {redirectUrl: sprites[id]};
            return resizeImage(sprites[id], width);
        }
    }
}, {
    urls: ['*://p.mjv.jp/5/img/view*'],
    types: ['image'],
}, ["blocking"]);
