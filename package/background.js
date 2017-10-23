chrome.runtime.onInstalled.addListener(function(object) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { urlContains: 'tenhou.net' },
                }),
            ],
            actions: [ new chrome.declarativeContent.ShowPageAction() ],
        }]);
    });

    // clear the translation cache, on install or upgrade, to force it to regenerate
    chrome.storage.local.set({ tables: null });

    // show options screen on install
    if (chrome.runtime.OnInstalledReason.INSTALL === object.reason) {
        chrome.runtime.openOptionsPage();
    }
});

chrome.runtime.onMessage.addListener(function(msg) {
    chrome.runtime.openOptionsPage();
});

function showIconForTab(tab) {
    if (tab.url.includes("tenhou.net")) {
      browser.pageAction.show(tab.id);
    }
}

let gettingAllTabs = browser.tabs.query({ url: '*://tenhou/net/*' });
gettingAllTabs.then((tabs) => {
    for (let tab of tabs) {
      showIconForTab(tab);
    }
});

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    showIconForTab(tab);
});