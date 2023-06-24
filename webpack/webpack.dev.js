const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { DefinePlugin } = require('webpack');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [
        new DefinePlugin({
            '__DEV__': process.env.NODE_ENV === 'development',
        })
    ]
});