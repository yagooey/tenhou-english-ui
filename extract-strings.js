const esprima = require('esprima');
const fs = require('fs');

const file = process.argv[2];

fs.readFile(file, 'utf8', (err, data) => {
    const allJapaneseStrings = extractJapaneseStrings(data);

    console.log(JSON.stringify({ allJapaneseStrings }, null, 4));
});

function extractJapaneseStrings(script) {
    let allJapaneseStrings = esprima.parseScript(script, { tokens: true }).tokens
        .filter((token) => {
            // Discard any non-Japanese strings
            return token.type === 'String' && token.value.includes('\\u');
        })
        .map((token) => {
            // Return an array of strings
            return eval(token.value);
        })
        .reduce((list, item) => {
            // At this level, some strings may still include HTML / CSS
            // eg. '<span style="display:none;">月間戦績</span>'
            // We will process each item and extract only the string we want

            if (item.startsWith('@font')) {
                // We don't care about CSS
                return list;
            }

            // Attempt to split strings using HTML tags as delimiter
            let subList = item.split(/<[a-zA-Z0-9.!@?#"$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]+>/g);

            // Filter out incomplete HTML blocks with unmatching arrow brackets
            subList = subList.reduce((subItemList, subItem) => {
                    return subItemList.concat(subItem.split(/[<>]/g));
                }, [])
                .filter((subItem) => {
                    // Discard again any non-Japanese strings
                    return escape(subItem).includes('%u');
                });

            return list.concat(subList);
        }, []);

    // Remove all duplicate entries
    return Array.from(new Set(allJapaneseStrings)).sort();
}
