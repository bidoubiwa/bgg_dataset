const MeiliSearch = require('meilisearch')
require('dotenv').config()

const config = {
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_API_KEY,
}

const client = new MeiliSearch(config)

if (!process.argv[2]) {
  throw new Error('Missing uid')
}
const uid = process.argv[2];

;(async () => {
  try {
    const index = await client.getOrCreateIndex(uid)
    const settings = await index.updateSettings({
      attributesForFaceting: [
        'boardgamecategory',
        'boardgamemechanic',
        'boardgamedesigner',
        'boardgameartist',
        'boardgamepublisher'
      ],
      rankingRules: [
        'typo',
        'words',
        'proximity',
        'attribute',
        'wordsPosition',
        'exactness',
        'desc(numberRatings)',
        'desc(yearPublished)',
      ],
    })
    console.log(await index.getUpdateStatus(settings.updateId));
    
  } catch(e) {
    console.error(e)
  }
})()
