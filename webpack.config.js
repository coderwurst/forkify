const path = require('path');        // node package

module.exports = {
    entry: './src/js/index.js',       // file to start app (entry point)
    
    output: {                        // where to save output file
        path: path.resolve(__dirname, 'dist/js'),  // __dirname is node variable for current absolute path + dist/js 
        filename: 'bundle.js'
    },

    mode: 'development'             // no code compression during development

};