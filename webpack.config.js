const path = require('path');        // node package
const HtmlWebpackPlugin = require('html-webpack-plugin');       // plugin import

module.exports = {
    entry: './src/js/index.js',       // file to start app (entry point)
    
    output: {                        // where to save output file
        path: path.resolve(__dirname, 'dist'),  // __dirname is node variable for current absolute path + dist 
        filename: 'js/bundle.js'
    },

    devServer: {
        contentBase: './dist'       // code that will be shipped to client (bundle.js, etc) same as output path
    },

    plugins: [                      // array of plugins
        new HtmlWebpackPlugin( {    // pass options into new object
            filename: 'index.html',
            template: './src/index.html'        // src of html file
        })
    ]
};