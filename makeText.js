/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

const textFromFile = (path) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.log(`Error reading file ${path}:`, err);
            process.kill(1);
        } else {
            console.log(data);
            generateText(data);
        }
    });
};

const textFromWeb = (url) => {
    axios
        .get(url)
        .then((response) => {
            console.log(response.data);
            generateText(response.data);
        })
        .catch((err) => {
            console.log(`Error calling ${url}`, err);
            process.exit(1);
        });
};

const generateText = (text) => {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
};

const printOutput = () => {
    let paramKey = process.argv[2];
    let paramValue = process.argv[3];

    if (paramKey === 'file') {
        textFromFile(paramValue);
    } else if (paramKey === 'url') {
        textFromWeb(paramValue);
    } else {
        console.log('Invalid parameter. Please enter text file or url.');
        process.exit(1);
    }
};

printOutput();