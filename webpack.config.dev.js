// All imports go at the top
import webpack from 'webpack';
import path from 'path';


// Webpack is configured by defining an object and adding properties
export default {
    debug: true,   // Enables displaying debug information
    devtool: 'cheap-module-eval-source-map',   // Large selection of devtools to choose from
    noInfo: false,    // Setting it to false means Webpack will display a list of all files that it's bundling
    entry: [    // Can pass an array of different entry points. Useful to inject middleware
        'eventsource-polyfill', // Necessary for hot reloading with IE
        'webpack-hot-middleware/client?reload=true', // Note that it reloads the page if hot, built-in hot-reloading. See changes in browser without full reload
        './src/index' // Actual entry point, must be last. Don't need to specify file extension
    ],
    target: 'web', // Can also set it to 'node' if using Webpack to build a Node app
    output: {  // Tell webpack where to create our development bundle
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: { // Tell Webpack's devServer where our code is
        contentBase: './src'
    },
    plugins: [ // Enhance Webpack's power
        new webpack.HotModuleReplacementPlugin(),  // Enables me to replace modules without having to do a full browser refresh.
        new webpack.NoErrorsPlugin()     // Help keep errors from breaking hot-reloading, will display error message in browser
    ],
    module: {
        loaders: [  // Tell Webpack what file types it should handle. 
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
            {test: /(\.css)$/, loaders: ['style', 'css']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}    
        ]
    }
};
