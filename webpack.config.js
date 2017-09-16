
const projectConfig = require('./project.config')
const path = require('path');

const config = {
  entry: './main.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: projectConfig.MODULE_NAME + '.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'},
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }],
        })
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack-loader?bypassOnDebug&interlaced=false'
          ]
        }
    ],
    plugins: [
        extractSass
    ]
  }
};


module.exports = config;
