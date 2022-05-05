const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    "mode" : "development",
    "output" : {
        "path" : path.resolve(__dirname, "dist"),
        "filename" : "InventoryTracker.js"
    },
    "plugins" : [
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html'
        })
    ],
    "module" : {
        "rules" : [
            {
              test: /\.(scss)$/,
              use: [{
                // inject CSS to page
                loader: 'style-loader'
              }, {
                // translates CSS into CommonJS modules
                loader: 'css-loader'
              }, {
                // Run postcss actions
                loader: 'postcss-loader',
                options: {
                  // `postcssOptions` is needed for postcss 8.x;
                  // if you use postcss 7.x skip the key
                  postcssOptions: {
                    // postcss plugins, can be exported to postcss.config.js
                    plugins: function () {
                      return [
                        require('autoprefixer')
                      ];
                    }
                  }
                }
              }, {
                // compiles Sass to CSS
                loader: 'sass-loader'
              }]
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            },
            {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
              use: {
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]',
                      outputPath: 'webfonts',
                      publicPath: '../webfonts',
                  },
              }
            }
        ]
    }
}