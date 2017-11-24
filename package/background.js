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

getImageDataURL(chrome.runtime.getURL('sprites/0.png'))
    .then((dataURL) => {
        return resizeImage(dataURL, 570, 344);
    })
    .then((newSprite) => {
        sprites[0] = newSprite;
    });

getImageDataURL(chrome.runtime.getURL('sprites/1.png'))
    .then((dataURL) => {
        return resizeImage(dataURL, 770, 284);
    })
    .then((newSprite) => {
        sprites[1] = newSprite;
    });

getImageDataURL(chrome.runtime.getURL('sprites/2.png'))
    .then((dataURL) => {
        return resizeImage(dataURL, 570, 344);
    })
    .then((newSprite) => {
        sprites[2] = newSprite;
    });

getImageDataURL(chrome.runtime.getURL('sprites/3.png'))
    .then((dataURL) => {
        return resizeImage(dataURL, 770, 284);
    })
    .then((newSprite) => {
        sprites[3] = newSprite;
    });

getImageDataURL(chrome.runtime.getURL('sprites/4.png'))
    .then((dataURL) => {
        return resizeImage(dataURL, 960, 580);
    })
    .then((newSprite) => {
        sprites[4] = newSprite;
    });

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
            return { redirectUrl: sprites[id] };
        }
    }
}, {
    urls: ['*://p.mjv.jp/*'],
}, ["blocking"]);
