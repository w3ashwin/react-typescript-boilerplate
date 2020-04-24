const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = process.env.NODE_ENV === 'dev';

const dirNode = 'node_modules';
const dirSrc = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'src/assets');

module.exports = {
  mode: IS_DEV ? 'development' : 'production',

  entry: {
    bundle: path.join(dirSrc, 'index.tsx'),
  },

  output: {
    path: __dirname + '/public',
    publicPath: 'build/',
    filename: '[name].bundle.js',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [dirNode, dirSrc, dirAssets],
  },

  optimization: {
    splitChunks: {
      name: false,
      chunks: 'async',
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEV,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      hash: true,
      title: 'Hello World',
      files: {
        css: ['[name].bundle.css'],
        js: ['[name].bundle.js'],
        chunks: {
          head: {
            entry: '',
            css: '[name].bundle.css',
          },
          main: {
            entry: '[name].bundle.js',
            css: [],
          },
        },
      },
    }),

    // new ExtractTextPlugin({
    //   filename: '[name].bundle.css',
    //   disable: IS_DEV,
    //   allChunks: true,
    //   ignoreOrder: false,
    // }),

    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery',
    //   'window.Tether': 'tether',
    //   Tether: 'tether',
    //   Popper: ['popper.js', 'default'],
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      // STYLES
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV,
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader',
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [require('autoprefixer')];
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          },
        ],
      },
      // IMAGES
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[hash].[ext]',
            publicPath: '/',
          },
        },
      },

      // FONTS
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },

      // Static HTML
      {
        test: /\.html$/,
        use: 'html-loader',
      },

      // VIDEOS
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
};
