/* global window,chrome,MutationObserver*/

'use strict';

let partialPhrases;
let mutationObserver;
let lastTranslationSeen = '';
let thisPartialTable = {};
let thisExactTable = {};
let thisTooltipTable = {};
let tableStore = {};

const observerSettings = {
    characterData: true,
    childList: true,
    subtree: true,
};

chrome.runtime.onMessage.addListener((request, sender) => {
    // Listen for option changed
    if (request.translate === 'all') {
        getTranslationSets((shouldTranslate) => {
            // restore all nodes to their original value, then translate them
            translateTextBeneathANode(document.body, true, shouldTranslate);
        });
    }
});

let holdingKeyDown = false;
let toggleTranslationOff;
let originalStore;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Control' && holdingKeyDown === false) {
        chrome.storage.local.get({ translation: lastTranslationSeen, toggle: false, altTranslation: 'off' }, function(storedval) {
            if (!storedval.toggle) {
                return;
            }
            originalStore = storedval;
            holdingKeyDown = true;
            toggleTranslationOff = storedval.altTranslation === 'off';
            if (toggleTranslationOff) {
                mutationObserver.disconnect();
            }
            chrome.storage.local.set({
                translation: storedval.altTranslation,
                altTranslation: storedval.translation,
            }, function() {
                getTranslationSets(function(canTranslate) {
                    translateTextBeneathANode(document.body, true, canTranslate);
                });
            });
        });
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Control' && holdingKeyDown) {
        chrome.storage.local.get({ toggle: false }, function(storedval) {
            if (!storedval.toggle) {
                return;
            }
            chrome.storage.local.set(originalStore, function() {
                if (toggleTranslationOff) {
                    setToObserve();
                }
                translateTextBeneathANode(document.body, !toggleTranslationOff, originalStore.translation !== 'off');
                holdingKeyDown = false;
            });
        });
    }
});

function getTranslationSets(callback) {
    // callback is called with argument: true if a translation is available, otherwise it is called with argument: false
    // Need a callback argument, because chrome.storage.local is only available asynchronously
    chrome.storage.local.get({ translation: 'DEFAULT' }, function(storedval) {

        if (storedval.translation === 'off') {
            return callback(false);
        }

        if (storedval.translation === lastTranslationSeen && Object.keys(thisExactTable).length) {
            // We've already got the right translation, so can go translate immediately

            return callback(true);
        }

        lastTranslationSeen = storedval.translation;

        let thisStatsTable;

        if (tableStore.hasOwnProperty(lastTranslationSeen) && Object.keys(tableStore[lastTranslationSeen]).length) {
            thisExactTable = tableStore[lastTranslationSeen].exact;
            thisPartialTable = tableStore[lastTranslationSeen].partial;
            thisStatsTable = tableStore[lastTranslationSeen].stats;
            thisTooltipTable = tableStore[lastTranslationSeen].tooltip;
        } else {
            let translation = storedval.translation.split(',');
            const overlay = function(tableIn) {
                let tableOut = {};

                for (let toTranslate of Object.keys(tableIn)) {
                    for (let thisTranslation of translation) {
                        if (tableIn[toTranslate][thisTranslation]) {
                            tableOut[toTranslate] = tableIn[toTranslate][thisTranslation];
                        } else if (tableIn[toTranslate][thisTranslation] === null) {
                            delete tableOut[toTranslate];
                        }
                    }
                }

                return tableOut;

            };

            thisExactTable = overlay(exactTranslation);
            thisPartialTable = overlay(partialTranslation);
            thisStatsTable = overlay(partialTranslationForStats);
            thisTooltipTable = overlay(tooltips);

            tableStore[lastTranslationSeen] = {
                exact: thisExactTable,
                partial: thisPartialTable,
                stats: thisStatsTable,
                tooltip: thisTooltipTable,
            };
        }

        if (window.location.href.indexOf('/3') === -1) {
            Object.assign(thisPartialTable, thisStatsTable);
        }

        // Sort by key length, so that when performing partial matching,
        // the entry with more matching characters will have priority
        partialPhrases = Object.keys(thisPartialTable).sort((a, b) => {
            return b.length - a.length;
        });

        return callback(true);
    });
}

/**
 * If restore is set to true, revert the node to original text.
 * If replace is set to true, translate the node
 */
function translateOneNode(node, restore = false, replace = true) {
    let thisParent = node.parentElement;

    if (thisParent && thisParent.tagName !== undefined && thisParent.tagName.toLowerCase() === 'button') {
        thisParent.style.overflow = 'hidden';
    }

    const originalText = node.nodeValue;

    if (!originalText) {
        return;
    }

    if (restore && node.originalValue) {
        // Restore the node back to its original value
        thisParent.replaceChild(document.createTextNode(node.originalValue), node);
    }

    if (!replace) {
        return;
    }

    let newText = thisExactTable[originalText.trim()];

    if (newText) {
        const newNode = document.createTextNode(newText);

        newNode.originalValue = originalText;
        thisParent.replaceChild(newNode, node);
    } else {
        newText = originalText;

        for (let needle of partialPhrases) {
            if (newText.includes(needle)) {
                newText = newText.replace(needle, thisPartialTable[needle]);
                if (thisTooltipTable[needle]) {
                    thisParent.setAttribute('title', thisTooltipTable[needle]);
                }
            }
        }

        // Exact tooltip matching
        if (thisTooltipTable[originalText.trim()]) {
            thisParent.setAttribute('title', thisTooltipTable[originalText.trim()]);
        }

        if (newText !== originalText) {
            if (thisParent.tagName.toLowerCase() === 'span') {
                thisParent.parentElement.style.overflow = 'hidden';
            } else {
                thisParent.style.overflow = 'hidden';
            }

            const newNode = document.createTextNode(newText);

            newNode.originalValue = originalText;
            thisParent.replaceChild(newNode, node);
        }
    }
}

const translateTextBeneathANode = function(topNode, restore = false, replace = true) {
    const textNodeIterator = document.createTreeWalker(topNode, NodeFilter.SHOW_TEXT, null, false);

    // We are messing with the Dom tree while we iterate over it, so first save in an array
    let textNodeList = [];

    while (textNodeIterator.nextNode()) {
        textNodeList.push(textNodeIterator.currentNode);
    }
    let node;

    for (node of textNodeList) {
        translateOneNode(node, restore, replace);
    }
};

function setToObserve() {
    mutationObserver.observe(document.documentElement, observerSettings);
}

function onMutate(mutations) {
    mutationObserver.disconnect();
    getTranslationSets(function(canTranslate) {
        if (canTranslate) {
            mutations.forEach(function(oneMutation) {
                translateTextBeneathANode(oneMutation.target, false, true);
            });
        }
        setToObserve();
    });
}

// This is what happens when the page is first loaded
getTranslationSets(function(canTranslate) {
    if (canTranslate) {
        translateTextBeneathANode(document.body, false, true);
        if (thisExactTable[document.title.trim()]) {
            document.title = thisExactTable[document.title.trim()];
        }
    }
    mutationObserver = new MutationObserver(onMutate);
    setToObserve();
});
