const extractXML = {
  basicGameInfo: ({games, title}) => {
    // Array with tupples of name and title for levenstein comparison
    let compareArray = [];
    // Array of object with both ID and name
    let allResults = [];
    for (let index = 0; index < games.length; index++) {
      // Retrieve NAME of potential game match
      let name = games[index].getElementsByTagName('name')[0].getAttribute('value');
      // Retrieve ID of potential game match
      let id = games[index].getAttribute('id');
      allResults.push({
        name, 
        id
      });
      compareArray.push([name, title]);
    }
    return {allResults, compareArray}
  },
  extendedGameInfo: (rawGames, id) => {
    try {
      let games = rawGames.getElementsByTagName("items");
      let nbrOfGames = games[0].getElementsByTagName("item").length; 
      let game = games[0].getElementsByTagName("item");
      let allGames = [];
      for (let index = 0; index < nbrOfGames; index++) {
        let extendedInfo = {};
        extendedInfo.id = id;
        extendedInfo.name = game[index].getElementsByTagName("name")[0].getAttribute('value');;
        console.log(extendedInfo.name);
        // Extract Year of publish 
        extendedInfo.yearPublished = game[index].getElementsByTagName("yearpublished")[0].getAttribute('value');
        // Extract all link tags for sorting purpose
        let links = Array.prototype.slice.call(game[index].getElementsByTagName('link'), 0);
        
        
        // Reduce function where each type of information is stored in an array with the type as key of this array.
        let linkInfo = links.reduce((acc, link) => {
          let type = link.getAttribute('type');
          return { ...acc, [type]: [ ...((acc[type]) ? acc[type] : []), link.getAttribute('value')]}
        }, {});
        console.log({ linkInfo });
        // Extract ratings, which is a sub tag in the item tag
        let ratings = game[index].getElementsByTagName('statistics')[0].getElementsByTagName('ratings')[0];
        console.log({ ratings });
        // Extract ranks which is a sub tag in the ratings tag
        let ranks = Array.prototype.slice.call(ratings.getElementsByTagName('ranks')[0].getElementsByTagName('rank'), 0);
        console.log({ ranks });
        
        extendedInfo.ranks = ranks.reduce((acc, rank) => {
          let rankName = rank.getAttribute('friendlyname');
          extendedInfo[rankName] = rank.getAttribute('value');
          return { ...acc, [rankName]: rank.getAttribute('value')}
        }, {})
        extendedInfo = { ...extendedInfo, ...linkInfo};
        
        extendedInfo.numberRatings = ratings.getElementsByTagName('usersrated')[0].getAttribute('value')
        
        extendedInfo.average = ratings.getElementsByTagName('average')[0].getAttribute('value')
        extendedInfo.averageweight = ratings.getElementsByTagName('averageweight')[0].getAttribute('value')
        
        // Extract minimum Players
        extendedInfo.minplayers = game[index].getElementsByTagName("minplayers")[0].getAttribute('value');
        // Extract maximum Players
        extendedInfo.maxplayers = game[index].getElementsByTagName("maxplayers")[0].getAttribute('value');
        // Extract average playing time
        extendedInfo.playingtime = game[index].getElementsByTagName("playingtime")[0].getAttribute('value');
        
        allGames.push(extendedInfo);
      }
      return allGames
    } catch (e) {
      throw e;
      // return false;

    }
  }
}
module.exports = extractXML;