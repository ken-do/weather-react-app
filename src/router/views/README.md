# Views

Components that render views(a.ka. pages) are defined here. Views are natural target for being lazy-loaded and this is something this app has done. With the help of the '@loadable/component' node_module, we could split the views into multiple chunks and only load the rquired chunks when rendering the app on the browser. Other chunks are provided asynchrously and only when they are needed.
