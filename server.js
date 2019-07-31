const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const path = require('path');
const {
    sortByCount,
    splitByWords,
    wordMap,
    filterData
} = require('./server/methods');
//middleware
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));






app.get('/:id', async (req, res) => {
    try {
        let count = req.params.id;
        let result = await axios.get("https://terriblytinytales.com/test.txt");
        let textData = result.data;
        let splitWords = splitByWords(textData);
        let createDictionary = wordMap(splitWords);
        let sortedDictionary = sortByCount(createDictionary);
        let sendFilterData = filterData(count, sortedDictionary);
        res.send({ data: sendFilterData })
    }
    catch (e) {
        res.status(500).send('Something broke!')
    }
});
// Anything that doesn't match the above, send back the index.html file
// app.get('*', (req, res) => {
//     console.log("Test")
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });
// app.get("*", (req, res) => {
//     console.log(__dirname, path.join(__dirname, 'client', 'build'))
//     const index = path.join(__dirname, 'client', 'build', 'index.html');
//     res.sendFile(index);
// })

// Choose the port and start the server
const PORT = process.env.PORT || 5000


app.listen(PORT, () => `Server running on port ${PORT}`);