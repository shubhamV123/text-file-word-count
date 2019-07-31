const wordMap = (wordArray) => {
    let dict = {};
    wordArray.forEach(word => {
        if (dict.hasOwnProperty(word)) {
            dict[word]++;
        } else {
            dict[word] = 1;
        }
    });

    return dict;

}
module.exports = wordMap;