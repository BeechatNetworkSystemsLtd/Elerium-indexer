# Decentralised Indexer with OrbitDB and Node.js

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/BeechatNetworkSystemsLtd/Elerium-indexer.git
cd Elerium-indexer
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

Running locally:

```bash
npm run dev
```

## API Documentation

### API Endpoints

List of available routes:

**Data routes**:

- `POST /v1/data` - create a user\

```bash
curl -X POST http://localhost:3000/v1/data \
-H "Content-Type: application/json" \
-H "publickey: artistOrOwnerPublicKey" \
-H "signature: signatureValidatingOwnershipOrAuthorization" \
-d '{
  "hashedKey": "hashedKey",
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

- `GET /v1/data/getDatas` - get all data\

```bash
curl http://localhost:3000/v1/data/getDatas
```

- `GET /v1/data/:hashedKey` - get a data\

```bash
curl http://localhost:3000/v1/data/hashedKey
```

- `PUT /v1/data` - update a data\

```bash
curl -X PUT http://localhost:3000/v1/data \
-H "Content-Type: application/json" \
-H "publickey: artistOrOwnerPublicKey" \
-H "signature: signatureValidatingOwnershipOrAuthorization" \
-d '{
  "hashedKey": "hashedKey",
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
curl -X DELETE http://localhost:3000/v1/data/hashedKey \
-H "publickey: artistOrOwnerPublicKey" \
-H "signature: signatureValidatingOwnershipOrAuthorization"
```
