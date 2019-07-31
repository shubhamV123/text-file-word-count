const sortByCount = (sortDict) => {

    // sort by count in descending order
    let finalWordsArray = [];

    finalWordsArray = Object.keys(sortDict).map(function (key) {
        return {
            name: key,
            total: sortDict[key]
        };
    });

    finalWordsArray.sort(function (a, b) {
        return b.total - a.total;
    });

    return finalWordsArray;

}
module.exports = sortByCount;