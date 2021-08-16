var path = require('path')
var webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: NODE_ENV == 'development' ? './src/main.js' : './src/myPlugin/graph/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: NODE_ENV == 'development' ? 'build.js' : 'graphComp.js',
    library: 'graphComp', // 指定的就是你使用require时的模块名
    libraryTarget: 'umd', // 指定输出格式
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]'
      //   }
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 230 * 1024,
          esModule: false,
          generator: (content, mimetype, encoding, resourcePath) => {
            console.log('resourcePath', resourcePath)
            if (/\.html$/i.test(resourcePath)) {
              return `data:${mimetype},${content.toString()}`;
            }

            return `data:${mimetype}${encoding ? `${encoding}` : ''
              },${content.toString(encoding)}`;
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      "@": path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  //   chainWebpack: (config) => {
  //     config.module
  //         .rule('')
  //         .test(/mxClient\.js$/)
  //         .use('exports-loader')
  //         .loader('exports-loader?mxClient,mxGraphModel,mxActor,mxShape,mxEventObject,mxGraph,mxPrintPreview,mxEventSource,mxRectangle,mxVertexHandler,mxMouseEvent,mxGraphView,mxImage,mxGeometry,mxRubberband,mxKeyHandler,mxDragSource,mxGraphModel,mxUtils,mxWindow,mxCodec,mxCell,mxConstants,mxPoint,mxGraphHandler,mxCylinder,mxCellRenderer,mxEvent,mxUndoManager,mxEditor,mxRectangleShape,mxConnectionHandler,mxOutline,mxClipboard,mxHierarchicalLayout,mxHierarchicalLayout,mxCircleLayout,mxFastOrganicLayout,mxGeometry,mxCoordinateAssignment')
  //         .end();
  // }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
