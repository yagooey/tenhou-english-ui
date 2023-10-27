/* jshint esversion: 6 */
/* globals chrome */

chrome.runtime.onInstalled.addListener(function(object) {
    /*
    // Clear all rules to ensure only our expected rules are set
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        let rule = {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {hostSuffix: 'tenhou.net'},
            }),
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {hostSuffix: 'ron2.jp'},
            })
          ],
          actions: [new chrome.declarativeContent.ShowAction()], // show addon icon for options screen
        };
        chrome.declarativeContent.onPageChanged.addRules([rule]);
        // console.log('icon should have been added now'); // TODO icon still not added, don't know why
    });
    */
    // show options screen on install
    if (chrome.runtime.OnInstalledReason.INSTALL === object.reason) {
        chrome.runtime.openOptionsPage();
    }
});

function updateTileset(items) {
    let newrule = [];
    let set = items.tileset;
    let sub = `https://mahjong.ie/files/tiles/tiles.php?set=${set}&id=\\1&w=\\20`
    if (set !== 'DEFAULT' ) {
        newrule = [{
            'id': 1,
            priority: 1,
            action: {
                type: 'redirect',
                redirect: { regexSubstitution: sub }
            },
            condition: {
                resourceTypes: ["image"],
                regexFilter: "^https://cdn\.tenhou\.net/./img/vieww([0-4])000*([1-9][0-9]*)\.png$"
            }
        }];
    }

    chrome.declarativeNetRequest.updateDynamicRules(
        {
            removeRuleIds: [1],
            addRules: newrule,
        }
    );
}

let tileset = 'DEFAULT';

// listen for messages about the user changing their options
chrome.runtime.onMessage.addListener(updateTileset);

// on load of extension
chrome.storage.local.get({ tileset: 'DEFAULT' }, (items) => updateTileset(items));

chrome.action.disable();


