const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 1. Entry Point: Where Webpack starts bundling
    entry: './src/index.js',

    // 2. Output: Where the bundled code goes
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },

    // 3. Loaders: Transformations applied to source files
    module: {
        rules: [
            {
                test: /\.js$/, // Look for .js files
                exclude: /node_modules/, // Don't process node_modules
                use: {
                    loader: 'babel-loader', // Use babel-loader to transpile modern JS/JSX
                },
            },
        ],
    },

    // 4. Plugins: Additional powerful features
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Use this HTML as a template
        }),
    ],
};
