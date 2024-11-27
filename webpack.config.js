const path = require('path');
const webpack = require('webpack'); // Importa webpack
const nodeExternals = require('webpack-node-externals');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        fallback: {
            "fs": false,
            "path": require.resolve("path-browserify"),
            "buffer": require.resolve("buffer/"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "url": require.resolve("url/"),
            "http": require.resolve("stream-http"),
            "crypto": require.resolve("crypto-browserify")
        }
    },
    plugins: [
        new NodePolyfillPlugin(), // Plugin para manejar polyfills automáticamente
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'] // Asegura que Buffer esté disponible globalmente
        })
    ]
};
