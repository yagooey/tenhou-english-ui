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
