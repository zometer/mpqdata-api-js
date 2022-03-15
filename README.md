# mpqdata-api-js

## Overview

A node.js web API for querying and displaying Marvel Puzzle Quest data. 

## Usage

### npm

````bash
# Build the project
$ npm run build

# Dev server start (with nodemon)
# NOTE: see below for correct .env settings. 
$ npm start

# Install (optional)
$ npm install dist/mpqdata-api-js-0.1.0-dev.0.tgz 

# Execute (optional)
$ npx mpqdata-api
````

### Node.js

````bash
# Run the application. 
# NOTE: see below for correct .env settings. 
$ node index.js
````

### Docker

Images are hosted at https://hub.docker.com/r/zometer/. 

````bash
# Run the application.
$ docker run -it \
    -e MPQ_API_DEVICEID=$DEVICE_ID \
    -e DB_URL=$DB_URL \
    -e DB_USERNAME=$DB_USERNAME \
    -e DB_PASSWORD=$DB_PASSWORD \
    -e PORT=$PORT \
    -e MARVEL_API_PRIVATEKEY=$MARVEL_API_PRIVATEKEY \
    -e MARVEL_API_PUBLICKEY=$MARVEL_API_PUBLICKEY \
    -e MPQ_API_DEVICEID=$MPQ_API_DEVICEID \
    -e GITHUB_API_TOKEN=$GITHUB_API_TOKEN \
    -e CONFIG_URL=$CONFIG_URL \
    zometer/mpqdata-api-js:latest
````

### TODO: Helm / Kubernetes

Helm charts are hosted at https://zometer.github.io/helm-charts. 

```bash
# Add the helm repository
$ helm repo add zometer https://zometer.github.io/helm-charts

# Install the chart, which creates the deployment, service, and ingress. 
$ helm install mpqdata-api zometer/mpqdata-api \
    -n mpqdata \
    --set config.db.url=$DB_URL,config.db.username=$DB_USERNAME,config.db.password=$DB_PASSWORD,config.cloudConfig.uri=$CLOUD_CONFIG_URL,config.mpq.api.deviceId=$DEVICE_ID

```

#### Example values.yaml

```yaml
config: 
  cloudConfig: 
    uri: http://mpqdata-config:8888
  db:
    url: jdbc:postgresql://localhost:5432/mpqdata
    username: db_user
    password: Super!Secure-Password-1231
  api: 
    marvel:
      privateKey: PRIVATE_KEY
      publicKey: PUBLIC_KEY
    mpq: 
      deviceId: DEVICE_ID
```

### API 

#### REST 

API Supported Versions: 
  - 1: The initial API version. 

Endpoint: /api/rest/v{apiVersion}/hello

```bash 
# Hello Request 
$ curl http://localhost:8080/api/rest/v1/hello
```

```json 
{
  "artifact": "mpqdata-api",
  "apiVersion": "1",
  "now": "2022-02-04T07:21:42.122+00:00",
  "version": "0.0.1-SNAPSHOT",
  "group": "net.mpqdata.app"
}
```

#### GraphQL 

## Dependencies

### Application

1. Node.js
1. Express
1. Sequelize 
1. Lodash
1. node-fetch
1. node-html-parser
1. yaml

### Databases

1. MPQDATA - Postgres database containing baseline MPQ character data.

### External APIs 

1. Marvel API
1. Grand Comics Database 

### Environment Variables

| Name                     | Value                                                | Notes / Example      |
|--------------------------|------------------------------------------------------|----------------------|
| PORT                     | Port the server will run on.                         |                      |
| DB_URL                   | URL for the mpqdata database.                        | `postgres://localhost:5432/mpqdata`      |
| DB_USERNAME              | Database username             | |
| DB_PASSWORD              | Database password             | |
| MPQ_API_DEVICEID         | Device Id needed to access MPQ API                   | |
| MARVEL_API_PRIVATEKEY    | Marvel API Private Key                               | |
| MARVEL_API_PUBLICKEY     | Marvel API Public Key                                | |
| CONFIG_URL               | URL containing the most of the app configs. (currently hosted via private GitHub repo) | YAML format |
| GITHUB_API_TOKEN         | API token used to access the remote config YAML      | |

## Issues

## TODOs

## Additional Information

1. https://developer.marvel.com
1. https://proxyman.io
