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
const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
})



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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000


app.listen(PORT, () => `Server running on port ${PORT}`);