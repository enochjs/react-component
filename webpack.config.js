const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: [
		'./app/main.js',
		'webpack-dev-server/client?http://localhost:8080', //自动刷新
		//'webpack/hot/only-dev-server', // react-hot-loader "only" prevents reload on syntax errors 
	], //入口文件
	output: {
		path: path.resolve(__dirname, 'dist'), //打包的文件夹位置
		filename: 'bundle.js', //文件名
	},

	module: {

		// Loaders 预处理文件
		// webpack本身只能处理javascript文件，如果要处理其他类型的文件，就需要使用 loader 进行转换。
		loaders: [{
			test: /\.js[x]?$/,
			exclude: /node_modules/,
			loader: 'babel', //babel（es6=>es5）套餐loader "babel-loader","babel-core","babel-preset-es2015","babel-preset-react","babel-preset-stage-0"
		}, {
			test: /\.css/,
			loader: 'style!css', // css文件  loader (style-loader,css-loader)
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader', // 图片
		}],
	},

	devtool: 'eval',

	// 热加载 （little node express server）当监听的文件夹内文件发生变化时，会重新编译打包
	// 打包后的文件是放在内存中的，存放的位置相对于publicPath( 即 assets/bundle.js ) 
	// ps: 官方文档中说publicPath在配置webpack-dev-server时必须写 
	// 个人实验其实不写也可以，不过打包后的位置就和入口的位置和名字相同 ( 即 app/main.js ),还是按照文档要求来吧

	// 自动刷新(automatic refresh) 有两种方式 
	// 1) iframe mode (文件放置在iframe中，全部刷新) http://localhost:8080/webpack-dev-server/index.html 无需其他配置
	// 2) inline node (局部刷新) webpack-dev-server 并没有提供入口配置，
	// 必须在entry中加入 webpack-dev-server/client?http://«path»:«port»/

	devServer: { //热加载 （node express server）
		contentBase: './app/', //需要监听的文件夹 (默认全部文件)
		publicPath: '/assets/', //定义存放在内存中的位置（可以） 不写的话读取output 中的publicPath
		hot: true,		// 热更新 
		inline: true,	//使用--inline选项会自动把webpack-dev-server客户端加到webpack的入口文件配置中 当hot也设置为true的时候就相当于在entry中加入'webpack/hot/only-dev-server'
		historyApiFallback: true,  // 启用html5 history api
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin() // react-hot-loader plugin引入
	]


}