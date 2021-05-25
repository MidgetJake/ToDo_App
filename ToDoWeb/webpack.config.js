const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    devServer: {
        historyApiFallback: true,
        contentBase: './public',
        hot: false,
        lazy: false,
        inline: false,
        liveReload: false,
        host: '0.0.0.0'
    },
    entry: {
        prod: path.join(APP_DIR, 'Entry/Public.jsx'),
    },
    mode: 'development',
    output: {
        path: BUILD_DIR,
        filename: 'js/bundle.js',
    },
    resolve: {
        modules: ['node_modules', APP_DIR],
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/react', '@babel/env'],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: [/\.svg$/],
                loader: 'svg-url-loader',
                options: {
                    limit: 100000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

module.exports = config;
