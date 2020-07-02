const fs = require('fs')
const path = require('path')

const dir = fs.readdirSync('./data').filter(file => path.extname(file) === '.json')

function ifExistToNumber(elem, key, stringToCompare = "0") {
    if (!elem[key] || elem[key] === stringToCompare){
        delete elem[key];
    } else {
        elem[key] = Number(elem[key])
    }
    return elem
}

;(async () => {
  try {
    dir.map(file => {
        let content = require(`./data/${file}`);
        for (let index = 0; index < content.length; index++) {
            content[index] = ifExistToNumber(content[index], 'yearPublished', "0")
            content[index] = ifExistToNumber(content[index], 'minplayers', "0")
            content[index] = ifExistToNumber(content[index], 'maxplayers', "0")
            content[index] = ifExistToNumber(content[index], 'yearPublished', "0")
            content[index] = ifExistToNumber(content[index], 'playingtime', "0")
            content[index] = ifExistToNumber(content[index], 'numberRatings', "0")
            content[index] = ifExistToNumber(content[index], 'average', "0")
            content[index] = ifExistToNumber(content[index], 'difficulty', "0")
            const keys = Object.keys(content[index].ranks)
            for (let i = 0; i < keys.length; i++) {
                content[index] = ifExistToNumber(content[index], keys[i], "Not Ranked")
            }
        }
        fs.writeFileSync(`./data/${file}`, JSON.stringify(content, null, ' ') ,'utf-8')
    })
  } catch(e) {
    console.error(e)
  }
})()
