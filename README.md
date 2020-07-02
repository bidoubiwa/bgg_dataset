# BGG dataset

### Envvironment variables

```
MEILI_HOST=http://127.0.0.1:7700
MEILI_API_KEY=key
```
Can be added in the `.env` file.

## Script

### Fetch all boardgames with the bgg API
```bash
yarn fetch_boardgames
```

### Bgg to MeiliSearch

Add the boardgames to your MeiliSearch Instance. Needs an UID to create the index.
```bash
yarn bgg_to_meili <UID>
```

### Settings to MeiliSearch

Add the settings to your index. Needs an UID to create the index.
```bash
yarn meili_settings <UID>
```

### Updates to MeiliSearch

Watch the updates in real time.  Needs an UID to create the index.
```bash
yarn meili_updates <UID>
```
