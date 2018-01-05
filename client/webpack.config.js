// Inspiration from:
// - https://stanko.github.io/webpack-babel-react-revisited/
// - https://github.com/workco/marvin
// - https://codeburst.io/simple-beginner-guide-for-webpack-2-0-from-scratch-part-ii-66beb5dbccc2

const webpack = require('webpack');
const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// Constant with our paths
const paths = {
  ROOT: path.resolve(__dirname),
  JS: path.resolve(__dirname, 'src'),
  IMG: path.resolve(__dirname, 'images'),
  BUILD: path.resolve(__dirname, 'build'),
};

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

/** ENTRY **************************************************/

const entry = [
  path.join(paths.JS, 'main.js'),
];

if (IS_DEVELOPMENT) {
  entry.unshift('react-hot-loader/patch');
}

/** PLUGINS ************************************************/

const plugins = [
  // Creates vendor chunk from modules coming from node_modules folder
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js',
    minChunks: 2
    // minChunks(module) {
    //   const context = module.context;
    //   return context && context.indexOf('node_modules') >= 0;
    // },
  }),
  new HtmlWebpackPlugin({
    template: path.join(paths.ROOT, 'index.html'),
    path: paths.BUILD,
    filename: 'index.html',
    minify: {
      // collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    },
  }),
  new ExtractTextPlugin('style.bundle.css'),
];

if (IS_DEVELOPMENT) {
  plugins.push(
    // enables pretty names instead of index
    new webpack.NamedModulesPlugin(),
    // Enables HMR
    new webpack.HotModuleReplacementPlugin(),
    // Don't emmit build when there was an error while compiling
    // No assets are emitted that include errors
    new webpack.NoEmitOnErrorsPlugin(),
    // enable dev dashboard
    new DashboardPlugin()
  );
}

/** RULES *************************************************/

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      use: 'css-loader'
    })
  }, {
    test: /\.(png|jpg|gif)$/,
    use: [{
      loader: 'file-loader'
      // options: {
      //   name: 'client/assets/[name]-[hash].[ext]'
      // }
    }]
  }
];

if (IS_DEVELOPMENT) {
  // add 'react-hot-loader' for .js/.jsx files
  rules[0].use.unshift('react-hot-loader/webpack');
}

// Almost the same rule is used in both development and production
// only diffence is source map param and ExtractTextPlugin
// so we are using this method to avoid redundant code
const getSassRule = () => {
  // const autoprefixerOptions = {
  //   browsers: [
  //     'last 3 version',
  //     'ie >= 10',
  //   ],
  // };

  const sassLoaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: IS_DEVELOPMENT,
        minimize: IS_PRODUCTION,
      },
    },
    // {
    //   loader: 'postcss-loader',
    //   options: {
    //     sourceMap: IS_DEVELOPMENT,
    //     plugins: () => [
    //       autoprefixer(autoprefixerOptions),
    //     ],
    //   },
    // },
    {
      loader: 'sass-loader',
      options: { sourceMap: IS_DEVELOPMENT },
    },
  ];

  if (IS_PRODUCTION) {
    return {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: sassLoaders,
      }),
    };
  }

  return {
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader',
      },
    ].concat(sassLoaders),
  };
};

// Add SASS rule to common rules
rules.push(getSassRule());


/** RULES *************************************************/

const devServer = {
  contentBase: IS_PRODUCTION ? paths.BUILD : paths.ROOT,
  historyApiFallback: true,
  port: 8080,
  compress: IS_PRODUCTION,
  inline: !IS_PRODUCTION,
  hot: !IS_PRODUCTION,
  host: '0.0.0.0',
  disableHostCheck: true, // To enable local network testing
  overlay: true,
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: true,
  },
};

// Webpack configuration
module.exports = {
  entry,
  context: paths.ROOT,
  output: {
    path: paths.BUILD,
    // publicPath: '/',
    filename: 'app.bundle.js'
  },
  plugins,
  module: {
    rules
  },
  // enable importing JS files without specifiying extensions
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // enable devtool for better debugging with source maps
  devtool: IS_PRODUCTION ? false : 'cheap-eval-source-map',
  watch: !IS_PRODUCTION,
  devServer
};
