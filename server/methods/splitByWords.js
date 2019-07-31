const splitByWords = (text) => {
    // split string by spaces (including spaces, tabs, and newlines)
    var wordsArray = text.split(/\s+(?!$)/);
    return wordsArray;
}

module.exports = splitByWords;