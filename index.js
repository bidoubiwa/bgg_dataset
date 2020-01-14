const bggCalls = require('./bgg_api_calls');
const bggExtract = require('./extract_bgg_xml');
const bggToJson = require('./bgg_to_json')
let id = 1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

(async () => {
    for (let id = 74000; id < 300000; id = id + 160) {
        
        console.log(' Creating first and second array');
        let first = Array.from(Array(80).keys()).map(x => x + id);
        let second = Array.from(Array(80).keys()).map(x => x + 80 + id);
        console.log('First Bgg Calls');
        let games = await bggCalls.gameInformation(first);
        let res1 = bggExtract.extendedGameInfo(games, first);
        console.log('Second Bgg Calls');
        let secondgames = await bggCalls.gameInformation(second);
        let res2 = bggExtract.extendedGameInfo(secondgames, second);
        let total = [...res1, ...res2];
        console.log('Adding to files');
        
        if (total) {
            bggToJson.append(total);
        } else {
            console.log(`${total} is not a game`); 
        }
        // await sleep(500)
    }

})()

// Comment en tappant board game rank je pourrais avoir les jeu triés par rank