# Decentralised Indexer with OrbitDB and Node.js

## API Documentation

### API Endpoints

List of available routes:

**Data routes**:

- `POST /v1/data` - create a user\

```bash
curl -X POST http://localhost:3000/v1/data \
-H "Content-Type: application/json" \
-d '{
  "hashedKey": "5",
  "nftMetadata": {
    "id": "uniqueNFTIdentifier",
    "title": "Artwork Title",
    "description": "Description of the artwork",
    "image": "urlToNFTImage",
    "artist": "Artist Name",
    "additionalInfo": "Any additional information"
  }
}'
```

- `GET /v1/data/getAll` - get all data\

```bash
curl http://localhost:3000/v1/data/getAll
```

- `GET /v1/data/:hashedKey` - get a data\

```bash
curl http://localhost:3000/v1/data/5
```

- `PUT /v1/data` - update a data\

```bash
curl -X PUT http://localhost:3000/v1/data \
-H "Content-Type: application/json" \
-d '{
  "hashedKey": "5",
  "nftMetadata": {
    "id": "New uniqueNFTIdentifier",
    "title": "New Artwork Title",
    "description": "New Description of the artwork",
    "image": "New urlToNFTImage",
    "artist": "New Artist Name",
    "additionalInfo": "New Any additional information"
  }
}'
```

- `DELETE /v1/data/:hashedKey` - delete a data

```bash
curl -X DELETE http://localhost:3000/v1/data/5
```
