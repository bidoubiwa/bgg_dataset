const axios = require('axios');
var DOMParser = require('xmldom').DOMParser;

const bggApiCalls = {
  
  findGame : async (title) => {
    // Search for game
    return axios.get(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${title}`)
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(res =>  res)
    .catch(err => {
      console.log({ msg: err.message, stack: err.stack });
    })
  },
  gameInformation: async (ids) => {
    // Get extented information about boardgame
    console.log(ids.join(','));
    
    return axios.get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${ids.join(',')}&stats=1&pagesize=100`)
    .then(response => {
      return response.data
    })
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(res =>  {
      return res
    }).catch(err => {
      console.log({ msg: err.message, stack: err.stack });
      throw err;
    })
  }
}
module.exports = bggApiCalls;