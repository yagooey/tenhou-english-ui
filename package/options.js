let thisForm = document.forms.optionform;

function saveOptions() {
    chrome.storage.local.set({
        tables: null,
        translation: thisForm.translation.value,
        toggle: thisForm.useToggler.checked,
        altTranslation: thisForm.toggleTo.value,
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
        altTranslation: 'off',
        toggle: false,
    }, function(items) {
        thisForm.translation.value = items.translation;
        thisForm.useToggler.checked = items.toggle,
        thisForm.toggleTo.value = items.altTranslation;
        thisForm.toggleToSet.style.display = items.toggle ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);

let radios = document.getElementsByName('translation');
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', saveOptions);
}

radios = document.getElementsByName('toggleTo');
for (i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', saveOptions);
}

thisForm.useToggler.addEventListener('change', function(e) {
    thisForm.toggleToSet.style.display = e.target.checked ? 'block' : 'none';
    saveOptions();
});

