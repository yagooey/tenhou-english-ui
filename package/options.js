function saveOptions() {
    chrome.storage.local.set({
        tables: null,
        translation: document.forms.optionform.translation.value,
    });
}

function restoreOptions() {
    chrome.storage.local.get({
        translation: 'off',
    }, function(items) {
        document.forms.optionform.translation.value = items.translation;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
let radios = document.getElementsByName('translation');
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', saveOptions);
}
