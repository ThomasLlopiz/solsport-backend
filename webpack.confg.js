const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production', // O 'development' si es en desarrollo
    entry: './src/index.js', // Aquí especificamos la entrada desde 'src/index.js'
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    target: 'node', // Asegúrate de que sea para un entorno Node.js
    externals: [nodeExternals()], // Excluye dependencias de node_modules
    module: {
        rules: [
            {
                test: /\.js$/, // Aplica babel-loader a archivos .js
                exclude: /node_modules/, // Excluye node_modules
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
