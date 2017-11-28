let thisForm = document.forms.optionform;
let sprites = {
    'DEFAULT': 'The standard tileset',
    'inverted': 'Black background. Smooth.',
    'english': 'English labels to help identify tiles',
};

function saveOptions() {
    chrome.storage.local.set({
        tileset: thisForm.tileset.value,
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
        tileset: 'DEFAULT',
        translation: 'DEFAULT',
        altTranslation: 'off',
        toggle: false,
    }, function(items) {
        thisForm.tileset.value = items.tileset,
        thisForm.translation.value = items.translation;
        thisForm.useToggler.checked = items.toggle,
        thisForm.toggleTo.value = items.altTranslation;
        thisForm.toggleToSet.style.display = items.toggle ? 'block' : 'none';
    });
}

let radios = document.getElementsByName('translation');
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', saveOptions);
}

let fieldset = document.getElementById('tileset');
for (tileset in sprites) {
    let label = document.createElement('label');

    let radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'tileset';
    radio.value = tileset;
    
    let sample = new Image();
    sample.src = 'sprites.' + tileset + '/sample.png';
    sample.alt = sprites[tileset];
    sample.title = sprites[tileset];
    
    label.appendChild(radio);
    label.appendChild(sample);
    fieldset.appendChild(label);
    radio.addEventListener('change', saveOptions);
}

radios = document.getElementsByName('toggleTo');
for (i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', saveOptions);
}

thisForm.useToggler.addEventListener('change', function(e) {
    thisForm.toggleToSet.style.display = e.target.checked ? 'block' : 'none';
    saveOptions();
});

document.addEventListener('DOMContentLoaded', restoreOptions);