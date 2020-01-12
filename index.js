const bggCalls = require('./bgg_api_calls');
const bggExtract = require('./extract_bgg_xml');
const bggToJson = require('./bgg_to_json')
let id = 1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

(async () => {
    for (let id = 0; id < 401; id = id + 200) {
        // console.log({ id });
        let first = Array.from(Array(100).keys()).map(x => x + id);
        let second = Array.from(Array(100).keys()).map(x => x + 100 + id);
        
        // console.log({ 
        //     first,
        //     second
        // });
        sleep(1)
        let hello = await bggCalls.gameInformation([1,2,3]);
        let res = bggExtract.extendedGameInfo(hello, id);
        // console.log({ res });
        if (res) {
            bggToJson.append(res);
        } else {
            console.log(`${id} is not a game`); 
        }
    }

})()

// Comment en tappant board game rank je pourrais avoir les jeu triés par rank