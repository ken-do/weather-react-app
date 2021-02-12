# Utils

Reusable helper functions, constants and higher-order-components created to be used flexibly throughout the app. These files include:

### api

A http client based on axios. Some default options were added for convenience and proper errors handling were implemented.

### constants

App constants are being defined in this file.

### formatters

Helper functions used to convert values from one format into another, for example, we use `dateToFriendlyDate` to convert a ISO formatted date string `2021-02-07` into a more readable and user-friendly string `Sun Feb 07 2021`.

### normalizers

Functions written to make sure predefined coding/naming conventions are met. For example, we requires that variable and object keys should be in `camelCase`, but an external services might return data that uses `snake_case` for it attribute keys. In this case, we can use a normalizer to convert the attributes keys into `camelCase` for the sake of consistency.

### router

Helper functions that enables quick interaction with the app router state. An example is `useQuery`, which allows us to get the current URL query params more quickly, since `react-router-dom` does not provide a quick way achieve this.

### ssr

Helper functions that assists the server-side rendering process.

### store

Typed versions of common `react-redux` hooks. We export these hooks for usage accross the app, so that we don't have to repeatedly type the original functions every time we call `useDispatch` and `useSelector`.

### testUtils

Defines a custom render that uses react-testing-library `render` underlyingly and expected to replace testing-library `render` in unit tests.
