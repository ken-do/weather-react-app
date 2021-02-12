# Router

A place to keep all the logic related to routing, i.e. displaying views based on the current requested URL.

All the available routes are listed in the `routes.ts` file, which maps a url pathname to the corresponding view and layout.

The `View.tsx` component iteratively runs through these mapped routes and render the view component that matches the requested URL.

Individual views and layouts were put into the respective folders, we can simply combine one view to any given layout by simply update the routes configuration.
