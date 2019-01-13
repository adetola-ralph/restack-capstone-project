import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const devMode = process.env.NODE_ENV !== 'production';

const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
});

const webpackConfig = {
  entry: () => {
    const entry = [
      'babel-regenerator-runtime',
      path.join(__dirname, 'client/index.jsx'),
    ];

    if (devMode) {
      entry.unshift('webpack-hot-middleware/client?reload=true');
    }

    return entry;
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    miniCssPlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: devMode ? JSON.stringify('development') : JSON.stringify('production'),
        WEBPACK: true,
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loaders: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?prefix=font/&limit=5000',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'inline-source-map' : '',
  optimization: {
    minimize: !devMode,
  },
};

if (devMode) {
  webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}

export default webpackConfig;
