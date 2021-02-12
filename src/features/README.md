# Features

The application main features which are groups of components and redux slices [https://redux-toolkit.js.org/usage/usage-guide#exporting-and-using-slices](https://redux-toolkit.js.org/usage/usage-guide#exporting-and-using-slices).

Async actions are handled by the redux-saga [https://github.com/redux-saga/redux-saga](https://github.com/redux-saga/redux-saga) middleware.

Things that distinguish these components from those kept in the `components` are that they do interact with the store and thus, can display a more complex behaviors, and that they are not supposed to be reused as much as the presentational ones.
