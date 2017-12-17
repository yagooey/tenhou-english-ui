document.addEventListener('DOMContentLoaded', (ignored) => {

    let thisForm = document.forms.optionform;
    const sprites = {
        'DEFAULT': { 'short': 'Standard', 'long': 'The standard tileset' },
        'english': { 'short': 'Labelled', 'long': 'Labelled with numbers, winds and dragons' },
        'bright':  { 'short': 'Brighter', 'long': 'Brighter colours' },
    };

    function updateWithNewOptions(options) {
        //update the tileset
        chrome.runtime.sendMessage(options);

        //update the translations
        chrome.tabs.query({ url: '*://tenhou.net/*' },
            (tabs) => tabs.forEach((tab) => chrome.tabs.sendMessage(tab.id, options))
        );
    }

    function toggleAltDisplay() {
        thisForm.toggleToSet.style.display = thisForm.useToggler.checked ? 'block' : 'none';
    }
    
    function saveOptions() {
        toggleAltDisplay();
        options = {
            tileset: thisForm.tileset.value,
            translation: thisForm.translation.value,
            toggle: thisForm.useToggler.checked,
            altTranslation: thisForm.toggleTo.value
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
        tileset: 'DEFAULT',
        translation: 'DEFAULT',
        altTranslation: 'off',
        toggle: false
    }, function(items) {
        thisForm.tileset.value = items.tileset;
        thisForm.translation.value = items.translation;
        thisForm.useToggler.checked = items.toggle;
        thisForm.toggleTo.value = items.altTranslation;
        toggleAltDisplay();
        updateWithNewOptions(items);
    });


});