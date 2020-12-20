/* jshint esversion: 6 */
/* global window,chrome,MutationObserver,exactTranslation,partialTranslation,tooltips,partialTranslationForStats,tournaments */

'use strict';

let partialPhrases;
let mutationObserver;
let lastTranslationSeen = '';
let thisPartialTable = {};
let thisExactTable = {};
let thisTooltipTable = {};
let thisTournamentsTable = {};
let tableStore = {};
let mainTranslation = 'off';
let altTranslation = 'off';
let usingAltTranslation = false;
let toggleTranslationOff;

const observerSettings = {
    characterData: true,
    childList: true,
    subtree: true,
};

function retranslateAll() {
    // restore all nodes to their original value, then translate them if needed
    translateTextBeneathANode(document.body, true, getTranslationSets());
}

function setOptions(options, ignored = null, ignored2 = null) {
    mainTranslation = options.translation;
    altTranslation = options.toggle ? options.altTranslation : null;
    retranslateAll();
    setToObserve();
}

chrome.runtime.onMessage.addListener(setOptions);

document.addEventListener('keydown', function(event) {
    if (event.key !== 'Control' || usingAltTranslation || !altTranslation) return;
    usingAltTranslation = true;
    toggleTranslationOff = altTranslation === 'off';
    if (toggleTranslationOff) {
        mutationObserver.disconnect();
    }
    retranslateAll();
});

document.addEventListener('keyup', function(event) {
    if (event.key !== 'Control' || !usingAltTranslation) return;

    if (toggleTranslationOff) {
        setToObserve();
    }
    usingAltTranslation = false;
    translateTextBeneathANode(document.body, !toggleTranslationOff, getTranslationSets());
});

function getTranslationSets() {
    let translation = usingAltTranslation ? altTranslation : mainTranslation;

    if (translation === 'off') return false;

    if (translation === lastTranslationSeen && Object.keys(thisExactTable).length) {
        // We've already got the right translation, so can go translate immediately
        return true;
    }

    lastTranslationSeen = translation;

    let thisStatsTable;

    if (tableStore.hasOwnProperty(lastTranslationSeen) && Object.keys(tableStore[lastTranslationSeen]).length) {
        thisExactTable = tableStore[lastTranslationSeen].exact;
        thisPartialTable = tableStore[lastTranslationSeen].partial;
        thisStatsTable = tableStore[lastTranslationSeen].stats;
        thisTooltipTable = tableStore[lastTranslationSeen].tooltip;
        thisTournamentsTable = tableStore[lastTranslationSeen].tournaments;
    } else {
        let setsToCombine = translation.split(',');
        const overlay = function(tableIn) {
            let tableOut = {};

            for (let toTranslate of Object.keys(tableIn)) {
                for (let thisTranslation of setsToCombine) {
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
        thisTournamentsTable = overlay(tournaments);

        tableStore[lastTranslationSeen] = {
            exact: thisExactTable,
            partial: thisPartialTable,
            stats: thisStatsTable,
            tooltip: thisTooltipTable,
            tournaments: thisTournamentsTable,
        };
    }

    if (window.location.href.indexOf('/3') === -1 
            && window.location.href.indexOf('/4') === -1) {
        if (window.location.href.indexOf('/make_lobby.html') === -1
            && window.location.href.indexOf('/cs/edit') === -1) {
            Object.assign(thisPartialTable, thisStatsTable);
        } else {
            Object.assign(thisPartialTable, thisTournamentsTable);
        }
    }


    // Sort by key length, so that when performing partial matching,
    // the entry with more matching characters will have priority
    partialPhrases = Object.keys(thisPartialTable).sort((a, b) => {
        return b.length - a.length;
    });

    return true;
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
        if (thisParent.style.fontSize === '400%') {
            thisParent.style.fontSize = '250%';
        }
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

function catchRadio(el) {
    let newClass;
    if (el.parentElement.innerText === 'On' && el.checked) {
        newClass = 'TournamentOptionisOn';
    } else if (el.parentElement.innerText === 'Off' && el.checked) {
        newClass = 'TournamentOptionisOff';
    } else {
        return;
    }
        
    el.parentElement.parentElement.parentElement.childNodes[0].className = 'r ' + newClass;
}

function onMutate(mutations) {
    mutationObserver.disconnect();
    if (getTranslationSets()) {
        mutations.forEach((oneMutation) => translateTextBeneathANode(oneMutation.target, false, true));
    }
    if (window.location.pathname.includes('/cs/edit')) {
        document.querySelectorAll("form[name=fe] input[type=radio]").forEach(function isItOn(el) {
            catchRadio(el);
            el.addEventListener('change', () => catchRadio(el));
            if (el.parentElement.innerText === 'Off' &&
                el.parentElement.parentElement.parentElement.children[2].innerText === 'Off' ) {
                // move the OFF radio button so that it always comes before the ON radio button
                el.parentElement.parentElement.parentElement.children[0].after(el.parentElement.parentElement);
            }
        });
    }
    setToObserve();
}

// This is what happens when the page is first loaded
chrome.storage.local.get(null, (options) => {
    mutationObserver = new MutationObserver(onMutate);
    setOptions(options);
    if (getTranslationSets()) {
        translateTextBeneathANode(document.body, false, true);
        if (thisExactTable[document.title.trim()]) {
            document.title = thisExactTable[document.title.trim()];
        }
    }
});
