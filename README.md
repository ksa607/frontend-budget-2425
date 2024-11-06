# Budget app

## Setup

Install all dependencies using the following command:

```bash
yarn install
```

Create a `.env` with the following content and apply to your configuration:

```dotenv
VITE_API_URL=http://localhost:9000/api
```

## Start the app

Start the app using `yarn dev`. It runs on <http://localhost:5137> by default.

## Test the app

Run the tests using `yarn test` and choose `E2E testing` in the Cypress window. It will open a new browser window where you can select which test suite to run.
