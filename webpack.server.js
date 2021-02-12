const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { loadableTransformer } = require('loadable-ts-transformer')
const LoadablePlugin = require('@loadable/webpack-plugin')

const modeConfiguration = (env) =>
    require(`./scripts/build/webpack.${env}`)(env)

const mode = process.env.NODE_ENV || 'production'

module.exports = () => {
    const config = merge(
        {
            entry: './src/server/index.ts',
            target: 'node',
            externals: [nodeExternals()],
            output: {
                path: path.resolve('build-server'),
                filename: 'index.js',
                libraryTarget: 'umd',
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: [
                            {
                                loader: 'ts-loader',
                                options: {
                                    configFile: 'tsconfig.server.json',
                                    getCustomTransformers: () => ({
                                        before: [loadableTransformer],
                                    }),
                                },
                            },
                        ],
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.jpe?g|png|gif|svg$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: 'static/media/[name].[hash:8].[ext]',
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            query: {
                                plugins: ['@loadable/babel-plugin'], // to allow lodable to work with SSR
                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true,
                            },
                        },
                    },
                ],
            },
            plugins: [
                new Dotenv(),
                new CleanWebpackPlugin(),
                new LoadablePlugin(),
            ],
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
                alias: {
                    root: __dirname,
                    src: path.resolve(__dirname, 'src'),
                },
            },
        },
        modeConfiguration(mode)
    )
    return config
}
