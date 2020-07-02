const bggCalls = require('./bgg_api_calls');
const bggExtract = require('./extract_bgg_xml');
const bggToJson = require('./bgg_to_json')
const biggestGameId = 312289
let id = 1;
let totalgames = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

(async () => {
    for (let id = biggestGameId; id < biggestGameId; id = id + 160) {
        let first = Array.from(Array(80).keys()).map(x => x + id);
        let second = Array.from(Array(80).keys()).map(x => x + 80 + id);
        let games = await bggCalls.gameInformation(first);
        let res1 = bggExtract.extendedGameInfo(games, first);
        let secondgames = await bggCalls.gameInformation(second);
        let res2 = bggExtract.extendedGameInfo(secondgames, second);
        let total = [...res1, ...res2];
        const ids = total.map(x => x.id)
        console.log(`biggest ID: ${Math.max(...ids)}`)
        await sleep(100)
        console.log(`Adding ${total.length} games`);
        if (total) {
            bggToJson.append(total);
        } else {
            console.log(`${total} is not a game`); 
        }
        totalgames+=total.length
        console.log(`-------------------------------`);
        console.log(`Total games added: ${totalgames}`);
        console.log(`-------------------------------`);
    }

})()

// Comment en tappant board game rank je pourrais avoir les jeu triés par rank