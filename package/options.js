function saveOptions() {
    chrome.storage.local.set({
        tables: null,
        translation: document.forms.optionform.translation.value,
        showOverlay: document.getElementById('showOverlay').checked,
    });
}

function restoreOptions() {
    chrome.storage.local.get({
        translation: 'DEFAULT',
        showOverlay: true,
    }, function(items) {
        document.forms.optionform.translation.value = items.translation;
        document.getElementById('showOverlay').checked = items.showOverlay;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);

let radios = document.getElementsByName('translation');
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', saveOptions);
}
document.getElementById('showOverlay').addEventListener('change', saveOptions);
