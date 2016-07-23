/**
 * Created by jin on 16/7/22.
 */
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
    }
});
module.exports = {
    watch: true,
    entry: {
        index: 'index'
    },
    output: {
         //  path: 'dist',
        filename: '[name].js',
        publicPath: "",
        chunkFilename: "[name].chunk.js",
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.js', '.jsx'],
        alias: {
            'carousel': 'js/components/carousel/carousel.js',
            'carousel.sass': 'js/components/carousel/carousel.scss',
            'index': 'js/page/index.js',
            'base': 'styles/base.scss',
            'normalize': 'styles/normalize.scss',
            'slide1': 'images/slide-1.jpg',
            'slide2': 'images/slide-2.jpg',
            'slide3': 'images/slide-3.jpg',
            'index.scss': 'js/page/index.scss'
        }

    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: '/node_modules/',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|ttf|eot)$/i,
                loaders: ['url-loader?limit=100000&name=[path][name][hash:8].[ext]', 'img?minimize']
            },
            {
                test: /\.(scss|css)/,
                loaders: ['style', 'css', 'autoprefixer-loader', 'sass']
            },
          //  {test: /\.js$/, loader: "eslint-loader", exclude: [/node_modules/, /js\/lib/]}
        ],
        noParse: []
    },
    plugins: [
        ],
    imagemin: {
        gifsicle: {interlaced: false},
        jpegtran: {
            progressive: true,
            arithmetic: false
        },
        optipng: {optimizationLevel: 5},
        pngquant: {
            floyd: 0.5,
            speed: 2
        },
        svgo: {
            plugins: [
                {removeTitle: true},
                {convertPathData: false}
            ]
        }
    },
    eslint: {
        configFile: '.eslintrc'
    }
};
