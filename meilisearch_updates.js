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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

;(async () => {
    const updates = await client.getIndex(uid).getAllUpdateStatus()
    console.log({ ...updates });
    
    let standartSpeed = 1000;
    let enqueued = true;
    while (enqueued) {
        try {
            const updates = await client.getIndex(uid).getAllUpdateStatus()
            const processed = updates.filter(update => update.status === "processed")
            const enqueued = updates.filter(update => update.status === "enqueued")
            console.log(`${processed.length} / ${updates.length} have been processed`);
            console.log(`${enqueued.length} / ${updates.length} still enqueued`);
            console.log('-------------');
            
            await sleep(standartSpeed)
        } catch(e) {
            console.error(e);
            
        }
    }
})()