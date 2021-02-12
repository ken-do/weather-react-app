const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
    webpack: {
        plugins: {
            add: [new LoadablePlugin()],
        },
    },
}
