/* jshint esversion: 6 */
/* globals chrome */
 
let tileset;
 
chrome.runtime.onInstalled.addListener(function(object) {
    // show options screen on install
    if (chrome.runtime.OnInstalledReason.INSTALL === object.reason) {
        chrome.runtime.openOptionsPage();
    }
});

// show the addon button for one tab
function showIconForTab(tab) {
    if (tab.url.includes('tenhou.net') || tab.url.includes('ron2.jp')) {
        chrome.pageAction.show(tab.id);
    }
}

// on initialisation, show the addon button for all tenhou tabs
chrome.tabs.query({ url: '*://tenhou.net/*|*://ron2.jp/*' }, (tabs) => {
    for (let tab of tabs) {
        showIconForTab(tab);
    }
});

chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => showIconForTab(tab));

chrome.storage.local.get('tileset', (val) => tileset = val.tileset || 'DEFAULT');

function updateTileset(options, sender=null, sendResponse=null) {
    tileset = options.tileset;
}

// listen for messages about the user changing their options
chrome.runtime.onMessage.addListener(updateTileset);

// Replace tile sprite sheets with custom sprite sheets
function tileCallback(details) {
    /**
     * Group 1: 1 digit, Sprite ID
     * Group 2: 2 digits, Don't know what these do; for now, they're both zero
     * Group 3: 3 digits, Width of image divided by 10
     */
    const spriteUrlRegex = /vieww([0-4])00([0-9]{3})\.png$/;

    // details.url is something like: https://cdn.tenhou.net/3/img/20201203/vieww000055.png
    const matches = spriteUrlRegex.exec(details.url);
    if (tileset === 'DEFAULT' || !matches ) return;

    const id = parseInt(matches[1]);
    const width = 10 * parseInt(matches[2]);
    
    let url = `https://mahjong.ie/files/tiles/tiles.php?set=${tileset}&id=${id}&w=${width}`;
    console.log(url);
    return { redirectUrl: url };

}

let tileFilter =  {
    urls: ['https://cdn.tenhou.net/*/img/vieww*'],
    types: ['image'],
};

let tileOptions = [
    'blocking'
    ];

chrome.webRequest.onBeforeRequest.addListener(tileCallback, tileFilter, tileOptions); // or onBeforeSendHeaders

// on load of extension
chrome.storage.local.get({ tileset: 'DEFAULT' }, (items) => updateTileset(items));
