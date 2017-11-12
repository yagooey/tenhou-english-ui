function saveOptions() {
    chrome.storage.local.set({
        tables: null,
        translation: document.forms.optionform.translation.value,
    });

    // Emit an event to translate the entire app
    chrome.tabs.query({ url: '*://tenhou.net/*' }, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs.sendMessage(tab.id, { translate: 'all' });
        });
    });
}

function restoreOptions() {
    chrome.storage.local.get({
        translation: 'DEFAULT',
    }, function(items) {
        document.forms.optionform.translation.value = items.translation;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);

let radios = document.getElementsByName('translation');
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', saveOptions);
}
