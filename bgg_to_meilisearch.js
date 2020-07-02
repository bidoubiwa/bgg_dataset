const MeiliSearch = require('meilisearch')
const fs = require('fs')
const path = require('path')
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

const dir = fs.readdirSync('./data').filter(file => path.extname(file) === '.json')

;(async () => {
  try {
    const index = await client.getOrCreateIndex(uid)
    const addDocs = dir.map(file => index.addDocuments(require(`./data/${file}`)))
    await Promise.all(addDocs)
  } catch(e) {
    console.error(e)
  }
})()
