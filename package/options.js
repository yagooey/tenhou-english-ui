function save_options() {
  chrome.storage.local.set({
    tables: null,
    translation: document.forms.optionform.translation.value
  });
}

function restore_options() {
  chrome.storage.local.get({
    translation: 'off'
  }, function (items) {document.forms.optionform.translation.value = items.translation;}
  );
}

document.addEventListener('DOMContentLoaded', restore_options);
var radios = document.getElementsByName('translation');
for (var i=0; i < radios.length; i++) {
  radios[i].addEventListener('change', save_options);
}