## How to use

### 1. Clone this repo & install dependencies

Install Node dependencies:

`npm install`

### 2. Create env files

Create the env files for dev, test and prod,
refer <span style="color:red;">env.example</span>

```sh
.env.development.local
.env.test.local
.env.production.local
```

### 3. Start the server

Launch your server with this command:

```sh
npm run dev
```

### Swagger Endpoint:

http://localhost:3001/api-docs

### Deploy to Cloud Run:

##### Requirements
* The [gcloud CLI](https://cloud.google.com/sdk/docs/install) installed
* Initialize the `gcloud CLI` - [Tutorial](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service?cloudshell=false)

1. Build the image using the `gcloud build` by running the script:
```bash
npm run cloudrun:build
```
2. Deploy the image using the following script:
```bash
npm run cloudrun:deploy
```
