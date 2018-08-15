module.exports = {
    entry: './src/index.js',
    mode:'production',
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    devServer: {
        inline: false,
        port: 4000,
        contentBase: __dirname + '/public/'
    },
    module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                }
            ]
        },
    performance: { hints: false }
};