# Decentralised Indexer with OrbitDB and Node.js

## Requirements

- Install Node.js which includes Node Package Manager

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
```

- example
```bash
# open .env and modify the environment variables (if needed)

# Port number
PORT=

# JWT
# JWT secret key
JWT_SECRET=
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=
# Number of minutes after which a reset password token expires
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=
# Number of minutes after which a verify email token expires
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=

#OrbitDB
BOOTSTRAP_ADDRESS=
ORBITDB_URL=
IS_NEW_DB=
LISTEN_PORT=
```

Running locally:

```bash
npm run dev
```

## API Documentation

### API Endpoints

List of available routes:

**Data routes**:

- `POST /v1/data` - create a data\

```bash
curl -X POST http://localhost:3000/v1/data \
-H "Content-Type: application/json" \
-H "publickey: PublicKey" \
-H "challenge: hash(metadata2)" \
-H "signature: signature(hash(metadata2))" \
-d '{
  "metadata1": "uniqueNFTIdentifier",
  "metadata2": {
    "title": "Artwork Title",
    "description": "Description of the artwork",
    "image": "urlToNFTImage",
    "artist": "Artist Name",
    "additionalInfo": "Any additional information"
  }
}'
```


- `GET /v1/data/:hashedKey` - get a data\

```bash
curl http://localhost:3000/v1/data/hashedKey
```

- `PUT /v1/data/:hashedKey` - update a data\

```bash
curl -X PUT http://localhost:3000/v1/data/hashedKey \
-H "Content-Type: application/json" \
-H "publickey: PublicKey" \
-H "challenge: hash(metadata2)" \
-H "signature: signature(hash(metadata2))" \
-d '{
  "metadata2": {
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
-H "challenge: challengeCode" \
```

## License

This project is licensed under the GNU Affero General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Copyright Notice

All rights reserved for Beechat Network Systems Ltd, a company in the UK. Copyright © 2024 Beechat Network Systems Ltd, Registered in England and Wales (reg.no. 12923057). Beechat®, is a registered trademark owned by Beechat Network Systems Ltd. All other trademarks, service marks, and company names are the property of their respective owners.
