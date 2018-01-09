document.addEventListener('DOMContentLoaded', (ignored) => {

    let thisForm = document.forms.optionform;
    const sprites = {
        'DEFAULT': {
            'short_en': 'Standard',
            'short_fr': 'Standard',
            'long': 'The standard tileset',
        },
        'english': {
            'short_en': 'Labelled',
            'short_fr': 'indices',
            'long': 'Labelled with numbers, winds and dragons',
        },
        'bright':  {
            'short_en': 'Brighter',
            'short_fr': 'Plus clairs',
            'long': 'Brighter colours',
        },
    };

    function updateWithNewOptions(options) {
        // Update the tileset
        chrome.runtime.sendMessage(options);

        // Update the translations
        chrome.tabs.query({ url: '*://tenhou.net/*' },
            (tabs) => tabs.forEach((tab) => chrome.tabs.sendMessage(tab.id, options))
        );
    }

    function toggleLanguage() {
        let languages = ['en', 'fr'];
        for (thisLanguage of languages) {
            let newDisplayValue = thisForm.language.value === thisLanguage ? 'block' : 'none';
            let elems = document.getElementsByClassName('i18n_' + thisLanguage);
            for (elem of elems) {
                elem.style.display = newDisplayValue;
            }
        }
    }

    function toggleAltDisplay() {
        thisForm.toggleToSet.style.display = thisForm.useToggler.checked ? 'block' : 'none';
    }

    function saveOptions() {
        toggleLanguage();
        toggleAltDisplay();
        const options = {
            language: thisForm.language.value,
            tileset: thisForm.tileset.value,
            translation: thisForm.translation.value,
            toggle: thisForm.useToggler.checked,
            altTranslation: thisForm.toggleTo.value,
        };
        chrome.storage.local.set(options, () => updateWithNewOptions(options));
    }

    let fieldset = document.getElementById('tileset');
    for (tileset in sprites) {
        let label = document.createElement('label');

        let radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'tileset';
        radioButton.value = tileset;

        let sample = new Image();
        sample.src = 'sprites.' + tileset + '/sample.png';
        sample.alt = sprites[tileset]['long'];
        sample.height = '100';

        label.appendChild(radioButton);
        let holder = document.createElement('div');
        holder.appendChild(sample);
        holder.appendChild(document.createElement('br'));
        holder.appendChild(document.createTextNode(sprites[tileset]['short']));
        holder.title = sprites[tileset]['long'];
        label.appendChild(holder);
        fieldset.appendChild(label);
    }

    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', saveOptions);
    }

    chrome.storage.local.get({
        language: chrome.i18n.getUILanguage(),
        tileset: 'DEFAULT',
        translation: 'DEFAULT',
        altTranslation: 'off',
        toggle: false,
    }, function(items) {
        thisForm.language.value = (items.language.substr(0,2) === 'fr') ? 'fr' : 'en';
        thisForm.tileset.value = items.tileset;
        thisForm.translation.value = items.translation;
        thisForm.useToggler.checked = items.toggle;
        thisForm.toggleTo.value = items.altTranslation;
        toggleLanguage();
        toggleAltDisplay();
        updateWithNewOptions(items);
    });


});
