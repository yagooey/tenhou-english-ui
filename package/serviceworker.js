/* jshint esversion: 6 */
/* globals chrome */

chrome.runtime.onInstalled.addListener(function(object) {
    // show options screen on install
    if (chrome.runtime.OnInstalledReason.INSTALL === object.reason) {
        chrome.runtime.openOptionsPage();
    }
});

/*
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
*/

function updateTileset(items) {
    let newrule = '';
    let set = items.tileset;
    let sub = `https://mahjong.ie/files/tiles/tiles.php?set=${set}&id=\\1&w=\\20`
    console.log(sub);
    if (set !== 'DEFAULT' ) {
        newrule = {
            'id': 1,
            priority: 1,
            action: {
                type: 'redirect',
                redirect: { regexSubstitution: sub }
            },
            condition: {
                resourceTypes: ["image"],
                regexFilter: "^https://cdn.tenhou.net/./img/vieww([0-4])000*([1-9][0-9]*).png$"
                //regexFilter: "^https://cdn\\.tenhou\\.net/*/img/vieww([0-4])000*([1-9][0-9]*)\\.png$"
            }
        };
    }

    chrome.declarativeNetRequest.updateDynamicRules(
        {
            removeRuleIds: [1],
            addRules: [newrule],
        }
    );
}

let tileset = 'DEFAULT';

// listen for messages about the user changing their options
chrome.runtime.onMessage.addListener(updateTileset);

// on load of extension
chrome.storage.local.get({ tileset: 'DEFAULT' }, (items) => updateTileset(items));
