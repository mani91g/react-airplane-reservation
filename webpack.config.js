const path = require('path')
const HtmlWebpackPlugin  = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    devtool: false,
    resolve: {
        extensions: ['.ts','.tsx','.js','.sx']
    },
  entry: './src/index.tsx',
  output: {
    filename: 'main.ts',
    path: path.resolve(__dirname, 'dist'),
  },
  module:{
      rules:[
        {test:/\.ts$/, use: 'ts-loader'},  
        {test:/\.tsx$/, use: 'ts-loader'},
        {test:/\.css$/, use: 'css-loader'},
        {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      ]
  },
  optimization: {
    runtimeChunk: true,
  },
  plugins: [new HtmlWebpackPlugin() ]
};