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

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details.url.length < 50 || '01234'.indexOf(details.url[29]) === -1) return;
        console.log(details.url); // 'http://model.webfactional.com/' & 
        return {redirectUrl: 'http://model.webfactional.com/' + details.url.substr(7,99)};
    },
    {urls: ['http://p.mjv.jp/5/img/view*.png'], types: ['image']}, 
    ['blocking'] // handle synchronously
);
