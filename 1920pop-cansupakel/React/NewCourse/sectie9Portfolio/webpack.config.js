const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname , 'public'),
        filename: 'bundle.js'
    },
    module:{
        rules:[{
            loader: 'babel-loader',
            test: /\.js$/,  //eindigt met js zodat jsx werkt babel
            exclude: /node_modules/ //we don't want that babel is running in nodemodules
        },{
            test: /\.s?css$/, //css en sccs
            use:[
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool:'cheap-module-eval-source-map', //je krijgt dan een link naar foutmelding, zonder dit krijg je naar babelrc link
    devServer:{
        contentBase:path.join(__dirname,'public'),
        historyApiFallback: true //handeling routing via client-side route
    }
};



