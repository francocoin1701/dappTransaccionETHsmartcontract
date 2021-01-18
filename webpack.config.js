
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.join(__dirname,'dist')
    },
    devServer:{
        contenBase: './dist',
        port: 9000,
        compress: true
    }
}