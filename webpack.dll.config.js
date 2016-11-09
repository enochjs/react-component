const path = require('path');
const webpack = require('webpack');

const outputPath = './app/dist';

module.exports = {
  entry: {
    vendor: [
      'antd',
      'react', 
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-actions',
      'redux-immutable',
      'immutable',
    ]
  },
  output: {
    path: path.join(__dirname, outputPath),
    filename: 'dll.[name].js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, outputPath, '[name]-manifest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。 
       */
      name: '[name]_library'
    })
  ]
};