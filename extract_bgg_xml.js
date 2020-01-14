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
  extendedGameInfo: (rawGames, ids) => {
    try {
      let games = rawGames.getElementsByTagName("items");
      let nbrOfGames = games[0].getElementsByTagName("item").length; 
      let game = games[0].getElementsByTagName("item");
      let allGames = [];
      for (let index = 0; index < nbrOfGames; index++) {
        try {
          let extendedInfo = {};
          let linkInfo = {};
          extendedInfo.id = game[index].getAttribute('id');
          extendedInfo.name = game[index].getElementsByTagName("name")[0].getAttribute('value');
          // console.log({name: extendedInfo.name, id:extendedInfo.id });
          try {
            extendedInfo.yearPublished = game[index].getElementsByTagName("thumbnail")[0].getAttribute('value');  
          }catch (_) { }
          try {
            // Year of publish 
            extendedInfo.yearPublished = game[index].getElementsByTagName("yearpublished")[0].getAttribute('value');  
          }catch (_) { }
          
          // Extract all link tags for sorting purpose
          try {
            let links = Array.prototype.slice.call(game[index].getElementsByTagName('link'), 0);
            // Reduce function where each type of information is stored in an array with the type as key of this array.
            linkInfo = links.reduce((acc, link) => {
              let type = link.getAttribute('type');
              return { ...acc, [type]: [ ...((acc[type]) ? acc[type] : []), link.getAttribute('value')]}
            }, {});
          }catch (_) { }
          
          // RATINGS
          try {
            // Extract ratings, which is a sub tag in the item tag
            let ratings = game[index].getElementsByTagName('statistics')[0].getElementsByTagName('ratings')[0];
            // console.log({ ratings });          
            // Extract ranks which is a sub tag in the ratings tag
            let ranks = Array.prototype.slice.call(ratings.getElementsByTagName('ranks')[0].getElementsByTagName('rank'), 0);
            // console.log({ ranks });
            
            extendedInfo.ranks = ranks.reduce((acc, rank) => {
              let rankName = rank.getAttribute('friendlyname');
              extendedInfo[rankName] = rank.getAttribute('value');
              return { ...acc, [rankName]: rank.getAttribute('value')}
            }, {})
          }catch (_) { }
          
          extendedInfo = { ...extendedInfo, ...linkInfo};
        
          // USER RATED
          try {
            extendedInfo.numberRatings = ratings.getElementsByTagName('usersrated')[0].getAttribute('value')
          }catch (_) { }
          // AVERRAGE
          try {
            extendedInfo.average = ratings.getElementsByTagName('average')[0].getAttribute('value')
          }catch (_) { }
          try {
            extendedInfo.averageweight = ratings.getElementsByTagName('averageweight')[0].getAttribute('value')
          } catch (_) { }
          try {
            // Extract minimum Players
            extendedInfo.minplayers = game[index].getElementsByTagName("minplayers")[0].getAttribute('value');
          } catch (_) { }
          try {
          // Extract maximum Players
          extendedInfo.maxplayers = game[index].getElementsByTagName("maxplayers")[0].getAttribute('value');
          }catch (_) { }
          try {
          // Extract average playing time
          extendedInfo.playingtime = game[index].getElementsByTagName("playingtime")[0].getAttribute('value');
          }catch (_) { }
          
          allGames.push(extendedInfo);
        }catch (_) { }
      }
      // console.log({ allGames });
      
      return allGames
    } catch (e) {
      throw e;
      // return false;

    }
  }
}
module.exports = extractXML;