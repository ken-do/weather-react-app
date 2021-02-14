# Getting Started with Weather React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) but was opened for extensions via [CRACO](https://github.com/gsoft-inc/craco)

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This command also starts an Express server at the address http://localhost:4000, which acts as a proxy server that forwards API requests made to this server to the actual metaweather.com API.

### `yarn start`

Builds and launches the Server-side rendered application in production mode. \
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

Under the hood, this script runs `yarn build` to build the app for the client side and `yarn build:ssr` to build the app on the server side. After that, it runs `yarn start:ssr` to launch the complete app in the interactive mode.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:coverage`

It does the same thing as `yarn test` but also shows the code coverage status and thus, provides more useful feedback for writing high quality unit tests.

### `yarn e2e`

Run all the Cypress tests in the headless mode using the Electron browser.

### `yarn e2e:open`

Open the Cypress Test Runner, useful for writing and running individual tests in Chrome during development.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn build:ssr`

Builds the server for production to the `build-server` folder. This involves bundling a server-side rendered app and compiling a proxy server. Server side rendering relies on the client-side rendered app being rendered first, so it's important that we run this command after `yarn build` in order for it to work properly.

### `yarn start:ssr`

Starts the server-side rendered app built by the previous command in the interactive mode. Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

### `yarn start:ssr:bg`

Starts the server-side rendered app in the detached mode, also located at [http://localhost:4000](http://localhost:4000).

As the app lauched using this command will be running in background, we need to manually stop it using the next command.

### `yarn stop:ssr:bg`

Stops the server-side rendered app launched by the previous command.

### `yarn lint:all`

Run linters through the code base to make sure predefined coding syntax and naming conventions are met. Individual linters could be triggered separately using commands start with `lint*`. Specifically, `lint:script` and `lint:al:script` commands were created for linting ts,tsx files using ESLint, `lint:style` and `lint:all:style` do the same thing but for stylesheets, i.e. `.scss` and `.css` files. Enforcing consitent file name casing was also taken into consideration with `ls-lint`, which can be triggered by running `lint:all:filename` command.

### `yarn format`

Puts the whole application into the correct format that follow to the rules defined in `.prettierrc.js`.
