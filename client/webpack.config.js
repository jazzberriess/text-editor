const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file. (complete)
// TODO: Add CSS loaders and babel to webpack. (complete)

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //HTML Webpac Plugin to auto-generate index.html file when bundling
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './favicon.ico',
        title: 'JATE',
      }),

      //plugin for service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js',
      }),

      //plugin for manifest.js file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'An in-browser text editor with offline capabilities.',
        background_color: '#beecfa',
        theme_color: '#beecfa',
        start_url: './',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [48, 96, 128, 192, 256, 284, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        //inject css into the dom + interpert @import and url()
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        //allow for transpiling with babel
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        //for the favicon: https://stackoverflow.com/questions/52024445/index-html-template-isnt-loading-favicon-for-htmlwebpackplugin/66761341#66761341
        {
          test: /\.ico$/i,
          type: 'asset/resource',
          // Use 'generator' to output unique name (based on webpack pattern e.g. [name], [ext], etc.)
          generator: {
            filename: '[name][ext][query]',
          },
        },
      ],
    },
  };
};
