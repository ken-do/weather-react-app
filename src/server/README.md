# Server

An express server built for 2 purposes:

Firsts, it serves as an entry point for server-side rendering the app. This feature is, however, only applicable when building the server for production using the `yarn build:ssr` command. In the development mode, it only exposes a proxy server intended to be used by the client-side application for quicker development. Both the dev server and the dev app can be conveniently started using the `yarn dev` command.

But more importantly, it acts as a proxy between the client application and the [metaweather public API](https://www.metaweather.com/api/#location). We had to do this as metaweather enforces a CORS policy that do not allow its resource to be shared by clients located at origins other than its own origin.
