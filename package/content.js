/* global window,chrome,MutationObserver*/

'use strict';

let partialPhrases;
let mutationObserver;
let lastTranslationSeen = '';
let thisPartialTable = {};
let thisExactTable = {};
let thisTooltipTable = {};

const observerSettings = {
    characterData: true,
    childList: true,
    subtree: true,
};

function getTranslationSets(callback) {
    // callback is called with argument: true if a translation is available, otherwise it is called with argument: false
    // Need a callback argument, because chrome.storage.local is only available asynchronously
    chrome.storage.local.get({ translation: 'DEFAULT' }, function(storedval) {

        if (storedval.translation === 'off') return callback(false);

        if (storedval.translation === lastTranslationSeen && thisExactTable) {
            // We've already got the right translation, so can go translate immediately

            return callback(true);
        }

        lastTranslationSeen = storedval.translation;
        let translation = storedval.translation.split(',');
        chrome.storage.local.get({ tables: null }, function(storedval) {

            let thisStatsTable;

            if (storedval.tables) {
                thisExactTable = storedval.tables.exact;
                thisPartialTable = storedval.tables.partial;
                thisStatsTable = storedval.tables.stats;
                thisTooltipTable = storedval.tables.tooltip;

            } else {
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

                // The cascaded translations are stored in local storage
                // (not sync, as the translations are too large for sync)
                // so that the cascading is only done
                // when the translation type is changed by the user on the options screen,
                // or when the extension is updated

                chrome.storage.local.set({ tables: {
                    exact: thisExactTable,
                    partial: thisPartialTable,
                    stats: thisStatsTable,
                    tooltip: thisTooltipTable,
                } });
            }

            if (window.location.href.indexOf('/3') === -1) {
                Object.assign(thisPartialTable, thisStatsTable);
            }

            partialPhrases = Object.keys(thisPartialTable);

            return callback(true);
        });
    });
}

function translateOneNode(node) {
    let thisParent = node.parentElement;
    if (thisParent && thisParent.tagName !== undefined && thisParent.tagName.toLowerCase() === 'button') {
        thisParent.style.overflow = 'hidden';
    }

    let originalText = node.nodeValue;
    if (!originalText) return;
    if (thisExactTable[originalText]) {
        thisParent.replaceChild(document.createTextNode(thisExactTable[originalText]), node);
    } else {
        let newText = originalText;
        let newTooltip = null;
        for (let needle of partialPhrases) {
            if (newText.includes(needle)) {
                newText = newText.replace(needle, thisPartialTable[needle]);
                if (!newTooltip && thisTooltipTable[needle]) {
                    thisParent.setAttribute('title', thisTooltipTable[needle]);
                    newTooltip = true;
                }
            }
        }
        if (newText !== originalText) {
            if (thisParent.tagName.toLowerCase() === 'span') {
                thisParent.parentElement.style.overflow = 'hidden';
            } else {
                thisParent.style.overflow = 'hidden';
            }
            thisParent.replaceChild(document.createTextNode(newText), node);
        }
    }
}

const translateTextBeneathANode = function(topNode) {
    const TextNodeIterator = document.createTreeWalker(topNode, NodeFilter.SHOW_TEXT, null, false);

    // We are messing with the Dom tree while we iterate over it, so first save in an array
    let TextNodeList = [];
    while(TextNodeIterator.nextNode()) {
        TextNodeList.push(TextNodeIterator.currentNode);
    }
    let node;
    for (node of TextNodeList) {
        translateOneNode(node);
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
                translateTextBeneathANode(oneMutation.target);
            });
        }
        setToObserve();
    });
}

// This is what happens when the page is first loaded
getTranslationSets(function(canTranslate) {
    if (canTranslate) {
        translateTextBeneathANode(document.body);
        if (thisExactTable[document.title]) {
            document.title = thisExactTable[document.title];
        }
    }
    mutationObserver = new MutationObserver(onMutate);
    setToObserve();
});
