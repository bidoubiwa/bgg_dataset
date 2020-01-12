const jsonfile = require('jsonfile')
 
let documentsInFile = 0;
let nbrFiles = 0;
let file = './data/bggdata'
const obj = { name: 'JP' }
 


const bggToJson = {
    append: (documents) => {
        if (documentsInFile > 10000) {
            documentsInFile = 0;
            nbrFiles++;
        }
        jsonfile.writeFile(`${file}${nbrFiles}.json`, documents, { flag: 'a' }, function (err) {
            if (err) console.error(err)
          })
        documentsInFile += documents.length;
    }
};

module.exports = bggToJson;
