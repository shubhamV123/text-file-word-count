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

// Choose the port and start the server
const PORT = process.env.PORT || 5000


app.listen(PORT, () => `Server running on port ${PORT}`);