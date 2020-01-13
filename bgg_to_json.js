const jsonfile = require('jsonfile')
const fs = require('fs');
 
let documentsInFile = 0;
let nbrFiles = 0;
let file = './data/bggdata'
const obj = { name: 'JP' }
 


const bggToJson = {
    append: (documents) => {
        if (documentsInFile > 1000) {
            documentsInFile = 0;
            nbrFiles++;
        }
        let currentFile = `${file}${nbrFiles}.json`;
        if (!fs.existsSync(currentFile)) {
            fs.writeFileSync(currentFile, JSON.stringify([], null, ' '))    
        }
        let current = JSON.parse(fs.readFileSync(currentFile))
        fs.writeFileSync(currentFile, JSON.stringify([...documents, ...current], null, ' '))
        documentsInFile += documents.length;
    }
};

module.exports = bggToJson;
